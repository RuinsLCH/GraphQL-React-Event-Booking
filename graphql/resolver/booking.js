const Booking = require('../../models/booking');
const Event = require('../../models/event');

const {transformBooking, transformEvent } = require('./merge');


module.exports = {
	bookings: async () => {
		const bookings = await Booking.find();
		return bookings.map(booking => {
			return {
				...booking._doc,
				_id: booking.id,
				user: user.bind(this, booking._doc.user),
				event: singleEvent.bind(this, booking._doc.event),
				createdAt: new Date(booking._doc.createdAt).toISOString(),
				updatedAt: new Date(booking._doc.updatedAt).toISOString()
			};
		});
	},
	bookEvent: async args => {
		const fetchedEvent = await Event.findOne({_id: args.eventId});
		const booking = new Booking({
			user: '5dbd1cbebfc1830db4ee3c72',
			event: fetchedEvent
		});
		const result = await booking.save();
		return {
			...result._doc,
			_id: result.id,
			user: user.bind(this, booking._doc.user),
			event: singleEvent.bind(this, booking._doc.event),
			createdAt: new Date(booking._doc.createdAt).toISOString(),
			updatedAt: new Date(booking._doc.updatedAt).toISOString()
		}
	},
	cancelBooking: async args => {
		try {
			const booking = await Booking.findById(args.bookingId).populate('event');
			const event = {
				...booking.event._doc,
				_id: booking.event.id,
				creator: user.bind(this, booking.event._doc.creator)
			};
			await Booking.deleteOne({ _id: args.bookingId });
			return event;
		} catch (err) {
			throw err;
		}

	}
}
	