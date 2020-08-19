import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    isEmpty
} from '../helpers/validations';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Booking
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createEvent = async (req, res) => {
    const {
        title, description, event_date, total_peoples, difficulty, starting_point, ending_point, distance
    } = req.body;
    const { user_id } = req.user;
    const created_on = moment(new Date());
    const createEventQuery = `INSERT INTO
            events( title, description, event_date, total_peoples, difficulty, starting_point, ending_point, distance, created_on, created_by)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            returning *`;
    const values = [
        title,
        description, 
        event_date, 
        total_peoples, 
        difficulty, 
        starting_point, 
        ending_point, 
        distance,
        created_on,
        user_id
    ];

    try {
        const { rows } = await dbQuery.query(createEventQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Unable to add event.';
        return res.status(status.error).send(errorMessage);
    }
};
const getAllEvents = async (_, res) => {
    const getAllEventsQuery = 'SELECT *,"users"."name" FROM events JOIN "users" ON (events.created_by=users.id)';
    try {
        const { rows } = await dbQuery.query(getAllEventsQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            successMessage.data = [];
            return res.status(status.success).send(successMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Failed to fetch events.';
        return res.status(status.error).send(errorMessage);
    }
};
export { createEvent, getAllEvents };