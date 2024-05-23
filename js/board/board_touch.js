let offsetX, offsetY;

        draggable.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];
            const rect = draggable.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
        });

        draggable.addEventListener('touchmove', (event) => {
            event.preventDefault(); // Prevent the default scrolling behavior
            const touch = event.touches[0];
            draggable.style.left = `${touch.clientX - offsetX}px`;
            draggable.style.top = `${touch.clientY - offsetY}px`;

            const dropRect = dropzone.getBoundingClientRect();
            if (touch.clientX > dropRect.left && touch.clientX < dropRect.right &&
                touch.clientY > dropRect.top && touch.clientY < dropRect.bottom) {
                dropzone.classList.add('highlight');
            } else {
                dropzone.classList.remove('highlight');
            }
        });

        draggable.addEventListener('touchend', (event) => {
            const touch = event.changedTouches[0];
            const dropRect = dropzone.getBoundingClientRect();
            if (touch.clientX > dropRect.left && touch.clientX < dropRect.right &&
                touch.clientY > dropRect.top && touch.clientY < dropRect.bottom) {
                alert('Dropped in the dropzone!');
            }
            dropzone.classList.remove('highlight');
        });