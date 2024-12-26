const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

const Jewellery = require("./models/jewellery.model");
const Wishlist = require("./models/wishlist.model");
const Cart = require("./models/cart.model");
const Address = require("./models/address.model");

initializeDatabase();
app.use(express.json());

//to get all jewelleries

const getAllJewellery = async () => {
  try {
    const allJewellery = await Jewellery.find();
    return allJewellery;
  } catch (error) {
    throw error;
  }
};

//getAllJewellery()
app.get("/jewelery", async (req, res) => {
  try {
    const jewellery = await getAllJewellery();
    if (jewellery.length > 0) {
      res.status(200).json(jewellery);
    } else {
      res.status(404).json({ error: "No Jewellery Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get jewellery" });
  }
});

//jewellery by jewelleryId
const getJewelleryById = async (jewelleryId) => {
  try {
    const jewellery = await Jewellery.findOne({ _id: jewelleryId });

    return jewellery;
  } catch (error) {
    throw error;
  }
};
app.get("/jewellery/:jewelleryId", async (req, res) => {
  try {
    const jewellery = await getJewelleryById(req.params.jewelleryId);

    if (jewellery) {
      res.status(200).json(jewellery);
    } else {
      res.status(404).json({ error: "No jewellery found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get jewellery." });
  }
});

//get jewellery by category
const getJewelleryByCategory = async (category) => {
  try {
    const jewellery = await Jewellery.findOne({ jewelleryType: category });
    return jewellery;
  } catch (error) {
    throw error;
  }
};
app.get(`/jewellery/:jewelleryCategory`, async (req, res) => {
  try {
    const jewellery = await getJewelleryByCategory(
      req.params.jewelleryCategory
    );
    if (jewellery) {
      res.status(200).json(jewellery);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get jewellery." });
  }
});

//get wishlist
app.get("/wishlist", async (req, res) => {
  try {
    const wishlistData = await Wishlist.find();

    if (wishlistData) {
      res.status(200).json(wishlistData);
    } else {
      res.status(404).json({ error: "wishlist items not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal Server Error while fetching wishlist data." });
  }
});

app.post("/wishlist", async (req, res) => {
  const { _id, name, mrp, discount, imageUrl } = req.body;
  try {
    const wishlistData = new Wishlist({ _id, name, mrp, discount, imageUrl });
    await wishlistData.save();

    res.status(201).json(wishlistData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Erorr. Failed to Add Data." });
  }
});

app.delete("/wishlist/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const removedItem = await Wishlist.findByIdAndDelete(productId);
    if (removedItem) {
      res.status(200).json({
        message: "Item removed from wishlist suessfully.",
        removedItem,
      });
    } else {
      res
        .status(400)
        .json({ error: "Failed to remove item from the wishlist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error." });
  }
});

//Cart
app.get("/cart", async (req, res) => {
  try {
    const cartData = await Cart.find();

    if (cartData) {
      res.status(200).json(cartData);
    } else {
      res.status(404).json({ error: "Cart items not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal Server Error while fetching Cart Data." });
  }
});

app.post("/cart", async (req, res) => {
  const { _id, name, mrp, discount, quantity, imageUrl } = req.body;
  try {
    const cartData = new Cart({ _id, name, mrp, discount, quantity, imageUrl });
    await cartData.save();
    if (cartData) {
      res.status(201).json(cartData);
    } else {
      res.status(400).json({ error: "Failed to add cart data." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Erorr. Failed to Add Data." });
  }
});

app.delete("/cart/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const removedItem = await Cart.findByIdAndDelete(productId);
    if (removedItem) {
      res
        .status(200)
        .json({ message: "Item removed from cart suessfully.", removedItem });
    } else {
      res.status(400).json({ error: "Failed to remove item from the cart." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error." });
  }
});

app.put("/cart/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );
    if (!updatedCartItem) {
      res.status(404).json({ error: "Product Not Found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//address
app.get("/address", async (req, res) => {
  const allAdresses = await Address.find();
  try {
    if (allAdresses.length > 0) {
      res.status(201).json(allAdresses);
    } else {
      res.status(404).json({ error: "No address found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/address/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const selectedAddress = await Address.findOne({ _id: id });
    console.log(selectedAddress);
    if (selectedAddress) {
      res.status(200).json(selectedAddress);
    } else {
      res.status(404).json({ error: "Address Not Found." });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error });
  }
});

app.post("/address", async (req, res) => {
  try {
    const newAddress = new Address({ ...req.body });
    await newAddress.save();
    if (newAddress) {
      res.status(200).json(newAddress);
    } else {
      res.status(400).json({ error: "failed to save address." });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.put("/address/:id", async (req, res) => {
  const addressId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      updatedData,
      { new: true }
    );
    if (updatedAddress) {
      res.status(200).json(updatedAddress);
    } else {
      res.status(400).json({ error: "Failed to update the address" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/address/:id", async (req, res) => {
  const addressId = req.params.id;
  try {
    const removedAddress = await Address.findByIdAndDelete(addressId);
    if (removedAddress) {
      res
        .status(200)
        .json({ message: "address removed suessfully.", removedAddress });
    } else {
      res.status(400).json({ error: "Failed to remove the address." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error." });
  }
});

app.delete("/cart", async (req, res) => {
  const { itemIds } = req.body; // Array of item IDs to remove
  console.log(itemIds);
  try {
    const clearedCart = await Cart.deleteMany({ _id: { $in: itemIds } });
    console.log(clearedCart);
    if (clearedCart) {
      res.status(200).json({ message: "Cart cleared successfully!" });
    } else {
      res.status(404).json({ message: "Error clearing cart!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
