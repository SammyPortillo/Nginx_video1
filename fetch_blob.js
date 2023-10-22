function winscript() {
    const fill = document.querySelector('.progress-bar-fill');
    const text = document.querySelector('.progress-text');

    fetch('media/video/elevator_pitch.MP4')
        .then(response => {
            const contentLength = response.headers.get('content-length');
            let loaded = 0;
            return new Response(
                new ReadableStream({
                    start(controller) {
                        const reader = response.body.getReader();
                        read();

                        function read() {
                            reader.read()
                                .then((progressEvent) => {
                                    if (progressEvent.done) {
                                        controller.close();
                                        return;
                                    }
                                    loaded += progressEvent.value.byteLength;
                                    console.log(Math.round(loaded / contentLength * 100) + '%');
                                    const percentageComplete = Math.round(loaded / contentLength * 100) + '%';
                                    fill.style.width = percentageComplete;
                                    text.innerText = percentageComplete;
                                    controller.enqueue(progressEvent.value);

                                    read();
                                })
                        }
                    }
                })
            );
        })
        .then(response => response.blob())
        .then(blob => {
            const my_vid = document.getElementById("my-video");
            my_vid.src = window.URL.createObjectURL(blob);
})
}