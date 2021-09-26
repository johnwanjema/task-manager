<template>
    <canvas id="canvas" width="400" height="400" style="background-color: #333; padding-top:20px;"></canvas>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            ctx: '',
            radius: '',
            second: 0,
            minute: 0,
            hour: 12,
            servers: 0,
            timeNow: moment().format("HH:mm:ss A"),
            timeOnTheClock: '',
            form:new Form({

            })
        }
    },
    methods: {
        createClock() {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            this.ctx = canvas.getContext("2d");
            var radius = canvas.height / 3;
            this.radius = canvas.height / 3;
            ctx.translate(radius, radius);
            radius = radius * 0.9;
            var v = this;
            setInterval(function() {
                v.drawClock();
                if (v.second == 59) {
                    v.second = 0;
                    if (v.minute == 59) {
                        v.minute = 0;
                        v.hour++;
                    } else {
                        v.minute++;
                    }
                } else {
                    v.second++;
                }
            }, 1000);
        },
        drawClock() {
            // console.log(this.ctx,this.radius)
            this.drawFace(this.ctx, this.radius);
            this.drawNumbers(this.ctx, this.radius);
            this.drawTime(this.ctx, this.radius);
        },
        drawFace(ctx, radius) {
            var grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
            grad.addColorStop(0, '#333');
            grad.addColorStop(0.5, 'white');
            grad.addColorStop(1, '#333');
            ctx.strokeStyle = grad;
            ctx.lineWidth = radius * 0.1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
            ctx.fillStyle = '#333';
            ctx.fill();
        },
        drawNumbers(ctx, radius) {
            var ang;
            var num;
            ctx.font = radius * 0.15 + "px arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            for (num = 1; num < 13; num++) {
                ang = num * Math.PI / 6;
                ctx.rotate(ang);
                ctx.translate(0, -radius * 0.85);
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius * 0.85);
                ctx.rotate(-ang);
            }
        },
        drawTime(ctx, radius) {
            var hour = this.hour;
            var minute = this.minute;
            var second = this.second;

            //hour
            hour = hour % 12;
            hour = (hour * Math.PI / 6) +
                (minute * Math.PI / (6 * 60)) +
                (second * Math.PI / (360 * 60));
            this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
            //minute
            minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
            this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
            // second
            second = (second * Math.PI / 30);
            this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
        },
        drawHand(ctx, pos, length, width) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.moveTo(0, 0);
            ctx.rotate(pos);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-pos);
        },
        startServers() {
            var random = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
            // console.log("start random " + random);
            this.servers = this.servers + random;
            // console.log("start servers ni hizi " + this.servers);
            this.getTimeOnTheClock();
            // console.log("actualTime " + this.timeNow);
            // console.log("time on the clock " + this.timeOnTheClock);
        },
        stopServers() {
            var random = Math.floor(Math.random() * (this.servers - 5 + 1)) + 5;
            console.log("stop random " + random);
            this.servers = this.servers - random;
            this.getTimeOnTheClock();
            console.log("actualTime " + this.timeNow);
            console.log("time on the clock " + this.timeOnTheClock);
        },
        reportServers() {
            console.log("total servers ni hizi " + this.servers);
            this.getTimeOnTheClock();
            console.log("actualTime " + this.timeNow);
            console.log("time on the clock " + this.timeOnTheClock);
        },
        startCountDown() {
            var timeLeft = 3;
            setInterval(countdown, 2000);
            var v = this;
            function countdown() {
                if (timeLeft == 0) {
                    timeLeft = 3;
                    v.startServers();
                } else {
                    timeLeft--;
                }
                // console.log(timeLeft);

            }
        },
        stopCountDown() {
            var timeLeft = 4;

            setInterval(countdown, 2000);

            var v = this;

            function countdown() {
                if (timeLeft == 0) {
                    timeLeft = 4;
                    v.stopServers();
                } else {
                    timeLeft--;
                }
                // console.log(timeLeft);

            }
        },
        reportCountDown() {
            var timeLeft = 5;

            setInterval(countdown, 1000);

            var v = this;

            function countdown() {
                if (timeLeft == 0) {
                    timeLeft = 5;
                    v.reportServers();
                } else {
                    timeLeft--;
                }
                // console.log(timeLeft);

            }
        },
        getTimeOnTheClock() {
            // console.log(this.hour + ":" + this.minute + ":" + this.second)
            this.timeOnTheClock = moment(this.hour + ":" + this.minute + ":" + this.second, "HH:mm:ss").format("hh:mm:ss A");
        }
    },
    mounted() {
        this.createClock();
        this.startCountDown();
        this.stopCountDown();
        this.reportCountDown();
    }
};
</script>