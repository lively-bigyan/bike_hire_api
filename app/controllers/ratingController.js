import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    isEmpty
} from '../helpers/validations';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

const createReview = async (req, res) => {
    const { id } = req.params;
    const {
        review_message,
        review_stars
    } = req.body;
    const user_id = req.user.user_id;
    const created_on = moment(new Date());
    const createReviewQuery = `INSERT INTO
            rating(shop_id, user_id, review_message, review_stars, created_on)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
    const values = [
        id,
        user_id,
        review_message,
        review_stars,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createReviewQuery, values);
        successMessage.message = "Review posted successfully.";
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Unable to add shop.';
        return res.status(status.error).send(errorMessage);
    }
};

const getReviews = async (req, res) => {
    const { id } = req.params;
    const getReviewsQuery = 'SELECT * FROM rating WHERE shop_id=$1';
    try {
        const { rows } = await dbQuery.query(getReviewsQuery, [id]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            successMessage.data = [];
            return res.status(status.success).send(successMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Failed to fetch ratings.";
        return res.status(status.error).send(errorMessage);
    }
};
export { createReview, getReviews };