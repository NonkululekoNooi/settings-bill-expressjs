let assert = require("assert");
let billWithSettings = require('../settings-bill-tests')



describe("The bill with settings factory", function () {


    it("should be able to set call cost", function () {
        let settingsBill = billWithSettings();
        settingsBill.setCallCost('0.85');
        settingsBill.setCriticalLevel(5)
        assert.equal(0.85, settingsBill.getCallCost());


        let settingsBillOne = billWithSettings();
        settingsBillOne.setCallCost('1.85');
        assert.equal(1.85, settingsBillOne.getCallCost());


        let settingsBillTwo = billWithSettings();
        settingsBillTwo.setCallCost('2.85');
        assert.equal(2.85, settingsBillTwo.getCallCost());

    })

    it("should be able to set sms cost", function () {
        let settingsBill = billWithSettings();
        settingsBill.setSmsCost('0.14');
        assert.equal(0.14, settingsBill.getSmsCost());


        let settingsBillOne = billWithSettings();
        settingsBillOne.setSmsCost('0.75');
        assert.equal(0.75, settingsBillOne.getSmsCost());


        let settingsBillTwo = billWithSettings();
        settingsBillTwo.setSmsCost('1.00');
        assert.equal(1.00, settingsBillTwo.getSmsCost());

    })

    it("should be able to set sms cost and call", function () {
        let settingsBill = billWithSettings();
        settingsBill.setCallCost('3.14');
        assert.equal(3.14, settingsBill.getCallCost());



        settingsBill.setSmsCost('0.95');
        assert.equal(0.95, settingsBill.getSmsCost());

    })


    it("should be able to set warning level", function () {
        let settingsBill = billWithSettings();
        settingsBill.setWarningLevel('20');
        assert.equal(20, settingsBill.getWarningLevel());



    })

    it("should be able to set critical level", function () {
        let settingsBill = billWithSettings();
        settingsBill.setCriticalLevel('40');
        assert.equal(40, settingsBill.getCriticalLevel());



    })

})

describe("use values", function () {

    it("should be able to use the call cost", function () {
        let settingsBill = billWithSettings();


        settingsBill.setCallCost(2.75);
        settingsBill.setSmsCost(0.00);
        settingsBill.setCriticalLevel(30)
        

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();


        assert.equal(8.25, settingsBill.getTotalCost());

        assert.equal(8.25, settingsBill.getTotalCallCost());

        assert.equal(0.00, settingsBill.getTotalSmsCost());

    })

    it("should be able to use the call cost for 2 calls at 1.35 each", function () {
        let settingsBill = billWithSettings();


        settingsBill.setCallCost(1.35);
        settingsBill.setCriticalLevel(5);

        settingsBill.makeCall();
        settingsBill.makeCall();


        assert.equal(2.70, settingsBill.getTotalCost());
        assert.equal(2.70, settingsBill.getTotalCallCost());



    })

    it("should be able to send 2 sms' at 0.56 each", function () {
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(20)
        settingsBill.setSmsCost(0.56);

        settingsBill.sendSms();
        settingsBill.sendSms();


        assert.equal(1.12, settingsBill.getTotalCost());
        assert.equal(1.12, settingsBill.getTotalSmsCost());




    })

    it("should be able to send 2 sms' at 0.56 each and make 1 call at 1.35", function () {
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(20)
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.56);

        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();


        assert.equal(2.47, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.12, settingsBill.getTotalSmsCost());



    });
});



describe("warning level and critical level", function () {
    it("it should return the name of 'warning' if the class when the warning level is reached", function () {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.56);
        settingsBill.setCriticalLevel(30)



        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        
        assert.equal("warning", settingsBill.totalClassName());


    });

    it("it should return the name of 'critical' if the class when the critical level is reached", function () {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(1.56);

        settingsBill.setWarningLevel(16)



        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();


        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("critical", settingsBill.totalClassName());




    });
    it("It should stop Total call cost from increasing when the critical level has been reached", function () {
        let settingsBill = billWithSettings()

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(1.56);

        settingsBill.setCriticalLevel(20)


        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("critical", settingsBill.totalClassName());

        assert.equal(20, settingsBill.getTotalCallCost())



    })
    it("It should allow the total to increase after it reaching the critical and warning level", function () {
        let settingsBill = billWithSettings()

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(1.56);
        settingsBill.getWarningLevel(10)
        settingsBill.setCriticalLevel(20)


        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal("critical", settingsBill.totalClassName());

        assert.equal(20, settingsBill.getTotalCallCost())


        settingsBill.setCriticalLevel(30)


        settingsBill.makeCall();
        settingsBill.makeCall();
        

        assert.equal("warning", settingsBill.totalClassName());
        assert.equal(25, settingsBill.getTotalCallCost())
    })



});









