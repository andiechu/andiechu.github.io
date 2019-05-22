(function () {
    var canvas = document.getElementById("particleCanvas");
    var textCanvas = document.getElementById("textCanvas");
    var ctx = canvas.getContext("2d");
    var tctx = textCanvas.getContext("2d");

    var cw, ch, tcw, tch;

    const textStr = "CAD";

    var num = 360;
    var deviceMobile = false;

    var position = [];
    var tpixels;
    var particles = [];
    var toff = 0.0;
    var lineLength = 600;

    function initText() {
        textCanvas.style.letterSpacing = 1.2+"em";
        tctx.textBaseline = "middle";

        tctx.fillStyle = "rgba(255, 255, 255, 1)";
        if (deviceMobile) {
            tctx.textAlign = "center";
            tctx.font = "12em Arial Black";
            tctx.fillText(textStr, tcw/2, tch/2);
        } else {
            tctx.textAlign = "right";
            tctx.font = "20em Arial Black";
            tctx.fillText(textStr, tcw-50, tch/2);
        }

        // var mt = tctx.measureText(textStr);

        tpixels = tctx.getImageData(0, 0, cw, ch).data;

        var data32 = new Uint32Array(tpixels.buffer);

        for (var i = 0; i < data32.length; i++) {
            if (data32[i] & 0xffff0000) {
                position.push({
                    x: (i % tcw),
                    y: ((i / tcw)|0),
                    a: tpixels[i*4 + 3] / 255
                });
            }
        }
    }

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.r = 3;
        this.theta = (Math.random() * 2 - 1)*0.02;
        this.thetab = 8;
        this.c = "rgba(255, 255, 255, 0.8)";
    }

    Particle.prototype.draw = function() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x + this.vx, this.y + this.vy, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    };

    Particle.prototype.move = function() {
        toff += 0.01;
        var movet = this.theta * toff;
        // console.log(movet);
        this.vx = Math.cos(movet)*this.thetab;
        this.vy = Math.sin(movet)*this.thetab;
    };

    Particle.prototype.drawLine = function() {
        for (var i = 0; i < particles.length; i++) {
            var op = particles[i];
            var dist = Math.pow((this.x+this.vx-op.x-op.vx), 2) + Math.pow((this.y+this.vy - op.y-op.vy), 2);
            if (dist < lineLength) {
                ctx.strokeStyle = this.c;
                ctx.beginPath();
                ctx.moveTo(this.x+this.vx, this.y+this.vy);
                ctx.lineTo(op.x+op.vx, op.y+op.vy);
                ctx.stroke();
                ctx.closePath();
            }
        }
    };

    function init() {
        if (window.innerWidth < 900) {
            cw = canvas.width = tcw = textCanvas.width = window.innerHeight;
            ch = canvas.height = tch = textCanvas.height = window.innerWidth;
            deviceMobile = true;
            num = 240;
            lineLength = 500;
        } else {
            cw = canvas.width = tcw = textCanvas.width = window.innerWidth;
            ch = canvas.height = tch = textCanvas.height = window.innerHeight;
            deviceMobile = false;
        }

        initText();

        for (var i = 0; i <  num; i++) {
            var pidx = Math.floor(Math.random() * position.length);
            particles[i] = new Particle(position[pidx].x, position[pidx].y);
            particles[i].draw();
        }

        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, cw, ch);
        particles.forEach(function(p) {
            // console.log(p.vx, p.vy)
            p.move();
            p.draw();
            p.drawLine();
        });
        requestAnimationFrame(animate);
    }

    init();
})();

