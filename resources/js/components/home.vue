<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <canvas id="canvas" width="400" height="400" :style="{'background-color': wallColour }"></canvas>
            </div>
            <div class="col-md-1">
            </div>
            <div class="col-md-8">
                <reports ref="reportsComponent"></reports>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import reports from './reports'
export default {
    components: {
        reports
    },
    data() {
        return {
            ctx: '',
            radius: '',
            second: 0,
            minute: 0,
            hour: 12,
            servers: 0,
            form: new Form({
                programTime: '',
                event: '',
                message: '',
                actualTime: moment().format("HH:mm:ss A"),
            }),
            wallColour:'#223',
            clockFaceColour:'yellow',
            hourLabesColour:'#1ecbe1',
            }
    },
    methods: {
        // Create Cloclk
        createClock() {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            this.ctx = canvas.getContext("2d");
            var radius = canvas.height / 3;
            this.radius = canvas.height / 3;
            ctx.translate(radius, radius);
            radius = radius * 0.9;
            this.getProgramTime();
        },
       
        //Draw clock face
        drawFace(ctx, radius) {
            var grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.clockFaceColour;
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
            ctx.fillStyle = this.hourLabesColour;
            ctx.fill();
        },

        //Draw clock numbers
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

        //Draw time
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

        //Draw Clock hands
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

        //Start servers
        startServers() {
            var random = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
            this.servers = this.servers + random;
            this.getActualTime();
            this.form.event = 'START'
            this.form.message = 'Start ' + random + ' servers'
            this.addTask('success');
            console.log("start servers ni hizi " + random);
            console.log("total servers ni hizi " + this.servers);
        },

        //Stop servers
        stopServers() {
            var random = Math.floor(Math.random() * (this.servers - 5 + 1)) + 5;
            this.servers = this.servers - random;
            this.getActualTime();
            this.form.event = 'STOP'
            this.form.message = 'Stop ' + random + ' servers'
            this.addTask('warning');
            console.log("stop servers " + random);
            console.log("total servers " + this.servers);
            // console.log("actualTime " + this.form.actualTime);
            // console.log("time on the clock " + this.form.programTime);
        },

        //Report Running Server
        reportServers() {
            console.log("total servers ni hizi " + this.servers);
            this.getActualTime();
            this.form.event = 'REPORT'
            this.form.message = 'Report ' + this.servers + ' servers running'
            this.addTask('info');
        },
       
        // Get Actual time
        getActualTime() {
            this.form.actualTime = moment().format("hh:mm:ss A");
        },

        //Send Task to Backend API
        addTask(icon) {
            toast.fire({
                icon: icon,
                title: this.form.message,
            });
            this.form.post("/api/tasks")
                .then(({ data }) => {
                    // console.log(data);
                    this.$refs.reportsComponent.getTasks();
                })
                .catch((e) => {
                    console.log(error)
                });
        },

        //Evaluate program time to 12 and Draw Clock
        getProgramTime() {
            var startTime = new Date();
            var v = this;
            var startTimeLeft = 30;
            var stopTimeLeft = 40;
            var reportTimeLeft = 50;
            function clock() {
                
                //the time you want to start from
                var mytime = new Date(2011, 0, 1, 12, 0, 0, 567);

                ///calcualte the difference between the start and current time
                var diff = new Date() - startTime;

                //add that difference to the offset time
                mytime.setMilliseconds(mytime.getMilliseconds() + diff);

                //Generate your output
                v.second = mytime.getSeconds();
                v.minute = mytime.getMinutes();
                v.hour = mytime.getHours();

                //Update program time
                v.form.programTime = v.hour + ":" + v.minute + ":" + v.second;

                //Draw face,numbers and time
                v.drawFace(v.ctx, v.radius);
                v.drawNumbers(v.ctx, v.radius);
                v.drawTime(v.ctx, v.radius);

                //Calculate time needed to start servers
                if (startTimeLeft == 1) {
                    startTimeLeft = 30;
                    v.startServers();
                } else {
                    startTimeLeft--;
                }

                //Calculate time needed to stop servers
                if (stopTimeLeft == 1) {
                    stopTimeLeft = 40;
                    v.stopServers();
                } else {
                    stopTimeLeft--;
                }

                //Calculate time needed to report servers
                if (reportTimeLeft == 1) {
                    reportTimeLeft = 50;
                    v.reportServers();
                } else {
                    reportTimeLeft--;
                }
            }

            setInterval(clock, 1000);
        },
    },
    mounted() {
        this.createClock();
    }
};
</script>