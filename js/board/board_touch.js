let touchStartX = 0;
let touchStartY = 0;  

/**
 * Handles the start of a dragging event for a task.
 * @param {string} taskId - The ID of the task being dragged.
 * @param {string} status - The current status of the task.
 * @param {Event} event - The event object representing the drag or touch start event.
 */
function startDragging(taskId, status, event) {
    if (event.type === 'dragstart') {
        registerTaskId(taskId);
        markAddableColumns(status);
        document.getElementById('status_bar_id').style.display = 'flex';
    } else if (event.type === 'touchstart') {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        registerTaskId(taskId);
        markAddableColumns(status);
        document.getElementById('status_bar_id').style.display = 'flex';
    }
}

/**
 * Handles the start of a touch event for a task.
 * @param {string} taskId - The ID of the task being touched.
 * @param {string} status - The current status of the task.
 * @param {TouchEvent} event - The event object representing the touch start event.
 */
function touchStart(taskId, status, event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    startDragging(taskId, status, event);
}

/**
 * Handles the end of a touch event, determining if it should be treated as a click or a drag.
 * @param {TouchEvent} event - The event object representing the touch end event.
 */
function touchEnd(event) {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        // Treat as a click
        return;
    }
    let targetElement = document.elementFromPoint(touchEndX, touchEndY);
    if (targetElement && targetElement.classList.contains('status')) {
        let status = targetElement.id.split('_')[1];
        moveTo(status);
    }
    deleteBorderStyles();
}

// task0.addEventListener('touchstart', (event) => {
//     const touch = event.touches[0];
//     const rect = draggable.getBoundingClientRect();
//     touchStartX = touch.clientX - rect.left;
//     touchStartY = touch.clientY - rect.top;
// })

// task0.addEventListener('touchmove', (event) => {
//     event.preventDefault(); // Prevent the default scrolling behavior
//     const touch = event.touches[0];
//     draggable.style.left = `${touch.clientX - touchStartX}px`;
//     draggable.style.top = `${touch.clientY - touchStartY}px`;
//     const dropRect = dropzone.getBoundingClientRect();
//     if (touch.clientX > dropRect.left && touch.clientX < dropRect.right &&
//         touch.clientY > dropRect.top && touch.clientY < dropRect.bottom) {
//         dropzone.classList.add('highlight');
//     } else {
//         dropzone.classList.remove('highlight');
//     }
// })

// task0.addEventListener('touchend', (event) => {
//     const touch = event.changedTouches[0];
//     const dropRect = dropzone.getBoundingClientRect();
//     if (touch.clientX > dropRect.left && touch.clientX < dropRect.right &&
//         touch.clientY > dropRect.top && touch.clientY < dropRect.bottom) {
//         alert('Dropped in the dropzone!');
//     }
//     dropzone.classList.remove('highlight');
// });