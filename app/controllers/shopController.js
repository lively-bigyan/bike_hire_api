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
const createShop = async (req, res) => {
    const {
        shop_name, shop_address, total_bikes, available_bikes, price
    } = req.body;
    const { user_id } = req.user;
    const created_on = moment(new Date());
    const createShopQuery = `INSERT INTO
            shops(shop_name, shop_address, shop_owner, total_bikes, available_bikes, price, created_on)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            returning *`;
    const values = [
        shop_name,
        shop_address,
        user_id,
        total_bikes,
        available_bikes,
        price,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createShopQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Unable to add shop.';
        return res.status(status.error).send(errorMessage);
    }
};
const getAllShops = async (req, res) => {
    const getAllShopsQuery = 'SELECT * FROM shops ORDER BY id ASC';
    try {
        const { rows } = await dbQuery.query(getAllShopsQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            successMessage.data = [];
            return res.status(status.success).send(successMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};
export { createShop, getAllShops };