window.addEventListener('DOMContentLoaded', () => {

// Main Variables
const toolBtns = document.querySelectorAll('.tool'),
    fillColor = document.querySelector('#fill-color'),
    sizeSlider = document.querySelector('#size-slider'),
    colorBtns = document.querySelectorAll('.colors .option')


// Kanvas va erkin chizish funksiyalari
const canvas = document.querySelector('canvas');

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

// O'zgaruvchilarning boshlang'ich qiymati:
let context = canvas.getContext('2d'),   
    isDrawing = false,
    brushWidth = 3,
    selectedTool = 'brush',
    prevMouseX,
    prevMouseY,
    snapshot

const  startDraw = (e) => {
        isDrawing = true;
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;

        /* chizishni turli joylarda davom ettirish metodi,
        ya'ni mishkani boshqa joyda qayta bossa chizishda davom etadi*/
        context.beginPath();

        // contextni chizish qalinligi  
        context.lineWidth = brushWidth;
        snapshot = context.getImageData(0, 0, canvas.width, canvas.height)
    }

// To'rtburchak chizish funksiyasi

const drawRectangle = e => {
    fillColor.checked 
    ? context.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) 
    : context.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) 


    // if(!fillColor.checked){
    //     context.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // } else {
    //     context.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // }
}

// Doira, aylana chizish

const drawCircle = e => {
    context.beginPath();
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    fillColor.checked  ? context.fill() : context.stroke()
}

// Uchburchak chizish

const drawTriangle = e => {
    context.beginPath();
    context.moveTo(prevMouseX, prevMouseY);
    context.lineTo(e.offsetX, e.offsetY);
    context.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    context.closePath();
    fillColor.checked ? context.fill() : context.stroke();
}

    function drawingPaint(e) {
        if (!isDrawing)
            return;

        context.putImageData(snapshot, 0, 0);

        switch (selectedTool) {
            case 'brush':
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                break;
            case 'rectangle':
                drawRectangle(e);
                break;
            case 'circle':
                drawCircle(e);
                break;
            case 'triangle':
                drawTriangle(e)
                break;
            default:
                break;

        }
    }

// Change Brush width
sizeSlider.addEventListener('change', () => brushWidth = sizeSlider.value)

// Ranglarni almashtirish
colorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
    })
})

// active klasini berish
toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id
    })
})

// Chizishni to'xtatish
    function stopDraw() {
        isDrawing = false;
    }

// canvasda mishka hodisalari
canvas.addEventListener('mousedown', startDraw) // "mousedown" mishka bosilganda chizish metodi
canvas.addEventListener('mousemove', drawingPaint) //"mousemove" mishkani harakatlangada chizish metodi
canvas.addEventListener('mouseup', stopDraw) // "mouseup" chizish paytida mishka qayta bosilsa chizmaslik metodi 































})