const request = require('supertest');
const server = require('../../index');
const assert = require('assert');
const stockService = require('./stock.service');
const StockRead = require('../../models/stockRead.model'); 
const UserModel = require('../../models/user.model'); 

//{ getStock, getHistory, getStats}

describe('Stock Service Tests', () => {
  const validStockCode = "msft.us", invalidStockCode = "123abc";

  describe('#getStock()',  () => {
    let validUserId;

    it('should return stock',  async () => {
      let stockRead = await stockService.getStock(validUserId, validStockCode);
      assert.equal(stockRead.symbol?.toLowerCase(), validStockCode);
    });

    it('should not return error',  async () => {
        let stockRead = await stockService.getStock(validUserId, validStockCode);
        assert.equal(stockRead.error, undefined);
    });

    
    it('should return error',  async () => {
        let stockRead = await stockService.getStock(validUserId, invalidStockCode);
        assert.notEqual(stockRead.error, undefined);
    });

        
    it('should return not found status',  async () => {
        let stockRead = await stockService.getStock(validUserId, invalidStockCode);
        assert.equal(stockRead.status, 404);
    });



    beforeEach(async () => {
        request(server);
        await StockRead.deleteMany();
        await UserModel.deleteMany();
        const newUser = await new UserModel({ email: "newemail@testing.com", role: "user", password: "123abcd"}).save();
        validUserId = newUser._id;
    });

    
    afterEach(async () => {
        await StockRead.deleteMany();
        await UserModel.deleteMany();
    });

    

  });

  describe('#getHistory()',  () => {
    let validUserId;
    
    it('should return empty array',  async () => {
      let history = await stockService.getHistory(validUserId);
      assert.equal(history.length, 0);
    });

    it('should return one element',  async () => {
        await stockService.getStock(validUserId, validStockCode);
        let history = await stockService.getHistory(validUserId);
        assert.equal(history.length, 1);
    });

    
    it('should return empty array',  async () => {
        let stockRead = await stockService.getStock(validUserId, invalidStockCode);
        let history = await stockService.getHistory(validUserId);
        assert.equal(history.length, 0);
    });

  
    beforeEach(async () => {
        request(server);
        await StockRead.deleteMany();
        await UserModel.deleteMany();
        const newUser = await new UserModel({ email: "newemail@testing.com", role: "user", password: "123abcd"}).save();
        validUserId = newUser._id;
    });

    
    afterEach(async () => {
        await StockRead.deleteMany();
        await UserModel.deleteMany();
    });

  });


  
  describe('#getStats()',  () => {
    let validUserId;
    
    it('should return empty array',  async () => {
      let stats = await stockService.getStats();
      assert.equal(stats.length, 0);
    });

    it('should return one element with times_requested equal to one',  async () => {
        await stockService.getStock(validUserId, validStockCode);
        let stats = await stockService.getStats();
        assert.equal(stats.length, 1);
        assert.equal(stats[0].times_requested, 1);
    });

    
    it('should return one element with times_requested equal to two',  async () => {
        await stockService.getStock(validUserId, validStockCode);
        await stockService.getStock(validUserId, validStockCode);
        let stats = await stockService.getStats();
        assert.equal(stats.length, 1);
        assert.equal(stats[0].times_requested, 2);
    });

  
    beforeEach(async () => {
        request(server);
        await StockRead.deleteMany();
        await UserModel.deleteMany();
        const newUser = await new UserModel({ email: "newemail@testing.com", role: "user", password: "123abcd"}).save();
        validUserId = newUser._id;
    });

    
    afterEach(async () => {
        await StockRead.deleteMany();
        await UserModel.deleteMany();
    });

  });




});