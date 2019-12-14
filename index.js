const Jimp = require("jimp");

// Jimp.read("./public/assets/images/sweaterTest.png", (err, sweater) => {
//   if (err) throw err;
//   sweater
//     .resize(256, 256) // resize
//     .quality(60) // set JPEG quality
//     .greyscale() // set greyscale
//     .write("sweater-bw.jpg"); // save
// });

//if you are following along, create the following 2 images relative to this script:
let imgRaw = "./public/assets/images/penguinTest.jpg"; //a 1024px x 1024px backgroound image
let sweaterRaw = "./public/assets/images/sweaterTest.png"; //a 155px x 72px logo
//---

// THIS CAN GO IN AN API POST
let imgExported = "./swaddle.jpg";

let textData = {
  // we will save our sweaters to have minimal transparant pad pad
  text: "Hello Swaddles", //the text to be rendered on the image
  maxWidth: 1004, //image width - 10px margin left - 10px margin right
  maxHeight: 100,
  placementX: 10, // 10px in on the x axis
  placementY: 550 //bottom of the image: height - maxHeight - margin
};

// read template
Jimp.read(imgRaw)

  //combine sweater into image
  .then(mashUp =>
    Jimp.read(sweaterRaw)
      .then(sweaterTemplate => {
        sweaterTemplate.opacity(1);
        // numbers in next line are the position x, y
        return mashUp.composite(sweaterTemplate, 0, 250, [
          Jimp.BLEND_DESTINATION_OVER,
          0.2,
          0.2
        ]);
      })

      //load font
      .then(textTemplate =>
        Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => [
          textTemplate,
          font
        ])
      )

      //  add text
      .then(data => {
        textTemplate = data[0];
        font = data[1];

        return textTemplate.print(
          font,
          textData.placementX,
          textData.placementY,
          {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },
          textData.maxWidth,
          textData.maxHeight
        );
      })

      //export image
      .then(textTemplate => textTemplate.quality(100).write(imgExported))

      //log exported filename
      .then(textTemplate => {
        console.log("exported file: " + imgExported);
      })

      //catch errors
      .catch(err => {
        console.error(err);
      })
  );
// view rawjimp-example.js hosted with ❤ by Git
