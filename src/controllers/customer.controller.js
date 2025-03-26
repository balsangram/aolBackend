import Customer from "../models/Customer.model.js";

export const registerCustomer = async (req, res) => {
  try {
    console.log(req.body, "admin register body");

    const { name, email, phoneNo, aadhaarNo, password } = req.body;

    console.log("in registerAdmin inside body", req.body);
    // Check if the admin already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin
    const newCustomer = new Customer({
      name,
      email,
      phoneNo,
      aadhaarNo,
      password,
    });
    console.log(newCustomer, "newCustomer");

    // Save to database
    await newCustomer.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newCustomer._id,
        name: newCustomer.name,
        phoneNo: newCustomer.phoneNo,
        aadhaarNo: newCustomer.aadhaarNo,
        email: newCustomer.email,
      },
    });
  } catch (error) {
    console.error("Error registering customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    console.log(req.body, "customer body");
    const { email, password } = req.body;
    const isCustomer = await Customer.findOne({ email });
    if (!isCustomer.email || !isCustomer.password)
      return res.status(400).json({ message: "all fied are required" });
    console.log(isCustomer, "customer all details");
    if (password !== isCustomer.password)
      return res.status(400).json({ message: "password is invalid" });

    res.status(200).json({ message: "customer login sucessafully " });
  } catch (error) {
    console.error("Error login customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
