import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    isEmpty
} from '../helpers/validations';

import {
    errorMessage, successMessage, emptyMessage, status,
} from '../helpers/status';

const createStory = async (req, res) => {
    const {
        title,
        story,
        difficulty,
        starting_point,
        ending_point,
        distance
    } = req.body;
    const user_id = req.user.user_id;
    const created_on = moment(new Date());
    if (isEmpty(title) || isEmpty(story) || isEmpty(starting_point) || isEmpty(ending_point)) {
        errorMessage.error = 'Email or Password  is missing';
        return res.status(status.bad).send(errorMessage);
    }
    const createStoryQuery = `INSERT INTO
            stories(title, story, difficulty, starting_point, ending_point, distance, created_by, created_on)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;
    const values = [
        title,
        story,
        difficulty,
        starting_point,
        ending_point,
        distance,
        user_id,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createStoryQuery, values);
        successMessage.message = "Story posted successfully.";
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Unable to add Story.';
        return res.status(status.error).send(errorMessage);
    }
};

const getStories = async (_, res) => {
    const getStoriesQuery = "SELECT s.*, u.name AS author FROM stories s JOIN users u ON (u.id = s.created_by)";
    try {
        const { rows } = await dbQuery.query(getStoriesQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            return res.status(status.success).send(emptyMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = "Error";
        return res.status(status.error).send(errorMessage);
    }
};
const getStoryById = async (_, res) => {
    const { id } = req.params;
    const getStoryQuery = 'SELECT * FROM stories WHERE shop_id=$1';
    const { rows } = await dbQuery.query(getStoryQuery, [id]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
        successMessage.data = [];
        return res.status(status.success).send(successMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
}
export { createStory, getStories, getStoryById };