const prisma = require('../db/prisma');

// Helper to parse boolean from string/boolean/number
const parseBoolean = (val) => {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return val === 1;
    if (typeof val === 'string') {
        return val.toLowerCase() === 'true' || val === '1';
    }
    return Boolean(val);
};

// Get all menus (or filter by keyword/typeId: /api/menu?keyword=...)
const getMenus = async (req, res) => {
    const { keyword, typeId } = req.query;
    try {
        const whereClause = {};
        if (keyword) {
            whereClause.OR = [
                { name: { contains: keyword } },
                { type: { name: { contains: keyword } } }
            ];
        }
        if (typeId) {
            whereClause.typeId = Number(typeId);
        }

        const menus = await prisma.menu.findMany({
            where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
            include: {
                type: true
            }
        });
        res.json(menus);
    } catch (err) {
        console.error('Error fetching menus:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Search menus (/api/menu/search?keyword=...)
const searchMenus = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: 'Please provide a search keyword' });
    }
    try {
        const menus = await prisma.menu.findMany({
            where: {
                OR: [
                    { name: { contains: keyword } },
                    { type: { name: { contains: keyword } } }
                ]
            },
            include: {
                type: true
            }
        });
        res.json(menus);
    } catch (err) {
        console.error('Error searching menus:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Get menu by ID (/api/menu/:id)
const getMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await prisma.menu.findUnique({
            where: { menuId: Number(id) },
            include: {
                type: true
            }
        });
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json(menuItem);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Create menu (POST /api/menu)
const createMenu = async (req, res) => {
    const { name, price, isBestSeller, typeId } = req.body;
    if (!name || price === undefined || price === '' || !typeId) {
        return res.status(400).json({ error: 'name, price, and typeId are required' });
    }
    try {
        const newMenu = await prisma.menu.create({
            data: {
                name: String(name).trim(),
                price: Number(price),
                isBestSeller: isBestSeller !== undefined ? parseBoolean(isBestSeller) : false,
                typeId: Number(typeId)
            },
            include: {
                type: true
            }
        });
        res.status(201).json(newMenu);
    } catch (err) {
        console.error('Error creating menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Update menu (PUT /api/menu/:id)
const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { name, price, isBestSeller, typeId } = req.body;
    if (!name || price === undefined || price === '' || !typeId) {
        return res.status(400).json({ error: 'name, price, and typeId are required' });
    }
    try {
        const updatedMenu = await prisma.menu.update({
            where: { menuId: Number(id) },
            data: {
                name: String(name).trim(),
                price: Number(price),
                isBestSeller: isBestSeller !== undefined ? parseBoolean(isBestSeller) : false,
                typeId: Number(typeId)
            },
            include: {
                type: true
            }
        });
        res.json(updatedMenu);
    } catch (err) {
        console.error('Error updating menu:', err);
        res.status(404).json({ error: 'Menu not found or database error' });
    }
};

// Delete menu (DELETE /api/menu/:id)
const deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.menu.delete({
            where: { menuId: Number(id) }
        });
        res.json({ message: 'Menu deleted successfully', menuId: Number(id) });
    } catch (err) {
        console.error('Error deleting menu:', err);
        res.status(404).json({ error: 'Menu not found' });
    }
};

module.exports = {
    getMenus,
    searchMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};
