function winscript() {

    // }
    // alert('Hello');
    const fill = document.querySelector('.progress-bar-fill');
    const text = document.querySelector('.progress-text');
    var gotvideo = false;
    // fetch('media/video/Big_Buck_Bunny_360_10s_1MB.mp4')
    fetch('media/video/elevator_pitch.MP4')
        .then(response => {

            const contentLength = response.headers.get('content-length');
            // Gets length in bytes (must be provided by server)

            let loaded = 0;
            // Will be used to track loading

            return new Response(

                new ReadableStream({
                    // Creates new readable stream on the new response object

                    start(controller) {
                        // Controller has methods on that allow the new stream to be constructed

                        const reader = response.body.getReader();
                        // Creates a new reader to read the body of the fetched resources

                        read();
                        // Fires function below that starts reading

                        function read() {

                            reader.read()
                                .then((progressEvent) => {
                                    // Starts reading, when there is progress this function will fire

                                    if (progressEvent.done) {
                                        controller.close();
                                        return;
                                        // Will finish constructing new stream if reading fetched of resource is complete
                                    }

                                    loaded += progressEvent.value.byteLength;
                                    // Increase value of 'loaded' by latest reading of fetched resource

                                    console.log(Math.round(loaded / contentLength * 100) + '%');
                                    // Displays progress via console log as %

                                    const percentageComplete = Math.round(loaded / contentLength * 100) + '%';
                                    fill.style.width = percentageComplete;
                                    text.innerText = percentageComplete;

                                    
                                    if ( !gotvideo && loaded / contentLength > .05){
                                        gotvideo = true;
                                        console.log('********************');
                                    // const my_vid = document.getElementById("my-video");
                                    // my_vid.src = window.URL.createObjectURL(blob);

                                    }
                        

                                    controller.enqueue(progressEvent.value);
                                    // Add newly read data to the new readable stream

                                    read();
                                    // Runs function again to continue reading and creating new stream

                                })
                        }
                    }
                })
            );
        })
        .then(response => response.blob()) // Read new readable stream to blob
        .then(blob => {
            // new Image().src = URL.createObjectURL(blob);
            const my_vid = document.getElementById("my-video");
            my_vid.src = window.URL.createObjectURL(blob);
            // document.body.appendChild(img);
            // Create new URL to blob image, set as src of image and append to DOM
        })





}