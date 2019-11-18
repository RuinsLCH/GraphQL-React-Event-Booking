const Event = require('../../models/event');

const { transformEvent } = require('./merge');

module.exports = {
	events: async () => {	
		try {
			const events = await Event.find();
			return events.map(event => {
				return {
					...event._doc,
					_id: event.id, 
					date: new Date(event._doc.date).toISOString(),
					creator: user.bind(this, event._doc.creator)
				};
			});
		} catch (err) {
			throw err;
		};
	},
	
	createEvent: async (args) => {
		const event = new Event({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: +args.eventInput.price,
			date: new Date(args.eventInput.date),
			creator: '5dbd1cbebfc1830db4ee3c72'
		});
		let createdEvent;
		try {
			const result = await event.save()
			createdEvent = {
				...result._doc, 
				_id: result._doc._id.toString(),
				date: new Date(event._doc.date).toISOString(), 
				creator: user.bind(this, result._doc.creator)
			};
			const user = await User.findById('5dbd1cbebfc1830db4ee3c72');
			if (!user) {
				throw new Error('User not found.');
			}
			user.createdEvents.push(event);
			await user.save();
			return createdEvent;
		} catch (err){ 
			console.log(err);
			throw err;
		};
	}
}