import User from "../models/User.js";
import Owner from "../models/Owner.js";

const owner = async (req, res) => {
  try {
    
    const userId = req.user._id;
    
    if (!userId) {
      console.log("No user ID found in token");
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    console.log("Found user:", user);
    
    if (!user) {
      console.log("User not found with ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User role:", user.role);
    
    // Check if user has owner role
    if (user.role !== "owner") {
      console.log("User is not an owner. Role:", user.role);
      return res.status(403).json({ error: "Access denied. You are not registered as an owner." });
    }

    // Get form data from request body
    const { address, g_address, ownerEmail, ownerPin } = req.body;
    
    console.log("Form data received:", {
      address: address ? "present" : "missing",
      g_address: g_address ? "present" : "missing", 
      ownerEmail: ownerEmail ? "present" : "missing",
      ownerPin: ownerPin ? "present" : "missing"
    });

    // Validate required fields
    if (!address || !g_address || !ownerEmail || !ownerPin) {
      return res.status(400).json({ 
        error: "All fields are required",
        missing: {
          address: !address,
          g_address: !g_address,
          ownerEmail: !ownerEmail,
          ownerPin: !ownerPin
        }
      });
    }

    // Check if owner profile already exists
    const existingOwner = await Owner.findOne({ userId: user._id });
    console.log("Existing owner check:", existingOwner ? "Found existing" : "None found");
    
    if (existingOwner) {
      return res.status(400).json({ 
        error: "Owner profile already exists for this user"
      });
    }

    // Create new owner profile
    const newOwner = new Owner({
      userId: user._id,
      address: address.trim(),
      g_address: g_address.trim(),
      ownerEmail: ownerEmail.trim().toLowerCase(),
      ownerPin: ownerPin.trim(),
    });

    console.log("Creating new owner profile for userId:", user._id);
    
    // Save to database
    const savedOwner = await newOwner.save();
    console.log("Owner profile saved successfully:", savedOwner._id);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Owner profile created successfully",
      ownerId: savedOwner._id
    });

  } catch (error) {
    console.error("Owner Controller Error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: "Invalid user ID format"
      });
    }

    // Generic server error
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong while creating owner profile"
    });
  }
};

export default owner;