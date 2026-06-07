const supabase = require('../config/supabaseClient');

const listMenus = async (req, res) => {
  try {
    const { data, error } = await supabase.from('menus').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to fetch menus' });
  }
};

const getMenusByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const { data, error } = await supabase
      .from('menus')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to fetch restaurant menus' });
  }
};

const createMenu = async (req, res) => {
  const { restaurant_id, name, description, price, image_url } = req.body;
  if (!restaurant_id || !name || !price) {
    return res.status(400).json({ error: 'Restaurant, name, and price are required' });
  }

  try {
    const { data, error } = await supabase
      .from('menus')
      .insert([{ restaurant_id, name, description, price, image_url }])
      .select('*')
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to create menu item' });
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('menus')
      .update({ name, description, price, image_url })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to update menu item' });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('menus').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to delete menu item' });
  }
};

module.exports = {
  listMenus,
  getMenusByRestaurant,
  createMenu,
  updateMenu,
  deleteMenu
};
