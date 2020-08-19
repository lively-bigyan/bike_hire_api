import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    isEmpty
} from '../helpers/validations';

import {
    errorMessage, emptyMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Booking
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createDestinations = async (req, res) => {
    const {
        title, description, isDifficult, starting_point, ending_point, distance
    } = req.body;
    const created_on = moment(new Date());
    const createDestinationQuery = `INSERT INTO
            events( title, description, is_difficult,starting_point, ending_point, distance, created_on, created_by)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            returning *`;
    const values = [
        title,
        description,
        isDifficult,
        starting_point,
        ending_point,
        distance,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createDestinationQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Unable to add event.';
        return res.status(status.error).send(errorMessage);
    }
};
const getDestinations = async (req, res) => {
    const getAllDestinationsQuery = 'SELECT * FROM destinations';
    try {
        const { rows } = await dbQuery.query(getAllDestinationsQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            return res.status(status.success).send(emptyMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};
export { createDestinations, getDestinations };