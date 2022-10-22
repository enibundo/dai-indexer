const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create transaction', async () => {
    expect.assertions(1);

    const transaction = await db.Transaction.create({
        id: 1,
        sender: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        recipient: '0xd24400ae8bfebb18ca49be86258a3c749cf46853',
        amount: "123"
    });
    
    expect(transaction.id).toEqual(1);
});

test('get transaction', async () => {
    expect.assertions(3);

    const transaction = await db.Transaction.findByPk(1);
    
    expect(transaction.sender).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    expect(transaction.recipient).toEqual('0xd24400ae8bfebb18ca49be86258a3c749cf46853');
    expect(transaction.amount).toEqual('123');
});

afterAll(async () => {
    await db.sequelize.close();
});