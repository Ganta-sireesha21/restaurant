const supabase = require('../config/supabaseClient');

const listRestaurants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('restaurants').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to fetch restaurants' });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('restaurants').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Restaurant not found' });
  }
};

const createRestaurant = async (req, res) => {
  const { name, description, location, image_url } = req.body;
  if (!name || !description || !location) {
    return res.status(400).json({ error: 'Name, description, and location are required' });
  }

  try {
    const { data, error } = await supabase
      .from('restaurants')
      .insert([{ name, description, location, image_url }])
      .select('*')
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to create restaurant' });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, location, image_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('restaurants')
      .update({ name, description, location, image_url })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to update restaurant' });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('restaurants').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to delete restaurant' });
  }
};

module.exports = {
  listRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
