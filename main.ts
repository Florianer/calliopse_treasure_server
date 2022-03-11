radio.onReceivedNumber(function (receivedNumber) {
    // SECOND TREASURE
    if (mode == 2) {
        music.playTone(receivedNumber, music.beat(BeatFraction.Sixteenth))
    }
})
// THIRD TREASURE - needs written hint: Ich bin prim prim prima und deshalb weiß meine Gruppe die Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest
function emitSignalAlternating (intervalInSeconds: number) {
    radio.setGroup(42)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    // band range: 0 - 83
    // prime numbers in the band
    // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83
    band = primeNumbers.shift()
    primeNumbers.push(band)
    basic.showNumber(band, 100)

    radio.setFrequencyBand(band)
    radio.sendString("Ich bin ein Baum!")
    basic.pause(intervalInSeconds * 1000)
}
// FIRST TREASURE
function emitSignal (intervalInSeconds: number) {
    radio.setGroup(1)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    radio.setFrequencyBand(0)
    /*
    radio.sendString("I am the red 1! Tell number 6 to make more noise")
    :/ 19 character limit. Message needs to be split and written note 
    */
    radio.sendString("I am the red 1!")
    basic.pause(intervalInSeconds * 1000)
}
// SECOND TREASURE - needs written hint: "Tell number 6 to make more noise"
function activeBeaconMode () {
    radio.setGroup(6)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    radio.setFrequencyBand(0)
}
input.onButtonPressed(Button.A, function () {
    mode = mode - 1
    if (mode < 1) {
        mode = 3
    }
    basic.showNumber(mode)
})
input.onButtonPressed(Button.B, function () {
    mode = mode + 1
    if (mode > 3) {
        mode = 1
    }
    basic.showNumber(mode)
})

basic.forever(function () {
    if (mode == 1) {
        emitSignal(3)
    }
    if (mode == 2) {
        activeBeaconMode()
    }
    if (mode == 3) {
        emitSignalAlternating(1)
    }
})

let band = 0
let mode = 0
let primeNumbers: number[] = []
let group = 0
primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83]