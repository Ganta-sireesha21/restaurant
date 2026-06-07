const supabase = require('../config/supabaseClient');

const createReservation = async (req, res) => {
  const { restaurant_id, reservation_date, guests, status } = req.body;
  const user_id = req.user.id;

  if (!restaurant_id || !reservation_date || !guests) {
    return res.status(400).json({ error: 'Restaurant, reservation date, and guest count are required' });
  }

  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([{ user_id, restaurant_id, reservation_date, guests, status: status || 'pending' }])
      .select('*')
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to create reservation' });
  }
};

const listReservations = async (req, res) => {
  try {
    const { data, error } = await supabase.from('reservations').select('*').order('reservation_date', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to fetch reservations' });
  }
};

const listReservationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, restaurants(*)')
      .eq('user_id', userId)
      .order('reservation_date', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to fetch user reservations' });
  }
};

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { reservation_date, guests, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({ reservation_date, guests, status })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to update reservation' });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('reservations').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to delete reservation' });
  }
};

module.exports = {
  createReservation,
  listReservations,
  listReservationsByUser,
  updateReservation,
  deleteReservation
};
