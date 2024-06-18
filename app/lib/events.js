import { sql } from "@vercel/postgres";

const createEvent = async (req, res) => {
  const { name, description, date, location } = req.body;

  try {
    await sql`
      INSERT INTO events (name, description, date, location)
      VALUES (${name}, ${description}, ${date}, ${location});
    `;
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

const getEvents = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM events`;
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching events', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

const updateEvent = async (req, res) => {
  const { id, name, description, date, location } = req.body;

  try {
    await sql`
      UPDATE events
      SET name = ${name}, description = ${description}, date = ${date}, location = ${location}
      WHERE id = ${id};
    `;
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.body;

  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

export { createEvent, getEvents, updateEvent, deleteEvent };
