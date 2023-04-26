const getOne = async ({ connection, queryString, params }) => {
    const [records] = await connection.query(queryString, params);
    if (!records) return null;
    return records[0];
};

const create = async({ connection, queryString, params }) => {
    const [result] = await connection.query(queryString, params);
    return result?.affectedRows > 0;
}

const update = async({ connection, queryString, params }) => {
    const [result] = await connection.query(queryString, params);
    return result?.affectedRows > 0;
};

export {
    getOne,
    create,
    update
}