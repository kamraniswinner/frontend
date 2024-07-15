import Inventory from '../models/Inventory.js';
import s3 from '../config/awsConfig.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new inventory item
export const createInventory = async (req, res) => {
  try {
    const { productNumber, productName, stock, batchNo, batchIncomingDate } = req.body;

    // Check if inventory item already exists for the given productNumber
    const existingInventory = await Inventory.findOne({ productNumber });

    if (existingInventory) {
      return res.status(400).json({ message: 'Inventory item already exists for this product' });
    }

    const files = req.files;
    const imageMetadata = await Promise.all(
      files.map(async (file) => {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${uuidv4()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        };
        const uploadResult = await s3.upload(params).promise();
        return { url: uploadResult.Location, key: params.Key };
      })
    );

    const newInventory = new Inventory({
      productNumber,
      productName,
      images: imageMetadata.map(img => img.url),
      stock,
      batchNo,
      batchIncomingDate,
    });

    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing inventory item
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productNumber, productName, stock, batchNo, batchIncomingDate } = req.body;

    const files = req.files;
    let imageMetadata = [];

    if (files && files.length > 0) {
      imageMetadata = await Promise.all(
        files.map(async (file) => {
          const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uuidv4()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
          };
          const uploadResult = await s3.upload(params).promise();
          return { url: uploadResult.Location, key: params.Key };
        })
      );
    }

    const updatedData = {
      productNumber,
      productName,
      stock,
      batchNo,
      batchIncomingDate,
      ...(imageMetadata.length > 0 && { images: imageMetadata.map(img => img.url) }),
    };

    const updatedInventory = await Inventory.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an inventory item
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all inventory items
export const getAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single inventory item by id
export const getInventoryByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
