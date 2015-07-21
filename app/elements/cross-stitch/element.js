(function() {
  'use strict';
  /*jshint -W064 */
  Polymer({
  /*jshint +W064 */
    is: 'cross-stitch',
    behaviors: [
      window.sizingBehavior,
      window.quantizeBehavior,
      window.pixelateBehavior,
      window.workerBehavior,
      window.miscBehavior
    ],

    properties: {
      numcolors: {
        type: Number,
        value: 16
      },
      gridwidth: {
        type: Number,
        value: 50
      },
      imageData: {
        type: Object
      },
      superPixelData: {
        type: Object
      },
      palette: {
        type: Array,
        notify: true
      }
    },

    ready() {
      this.$.finalOutput.imageSmoothingEnabled =
      this.$.finalOutput.msImageSmoothingEnabled =
      this.$.finalOutput.mozImageSmoothingEnabled =
      this.$.finalOutput.webkitImageSmoothingEnabled = false;

      var numberOfCores = navigator.hardwareConcurrency || 4;

      this.createWorkers('libs.js', numberOfCores);

    },

    newFile() {
      this.startTime = performance.now();

      // First, scale the image correctly
      this._scaleImage.bind(this)()
      .then(this._dispatchBuildPalette.bind(this))
      .then(this._processImage.bind(this))
      .catch(this._catchErrors);
    },

    _scaleImage(){
      return this.scale({
        imageData: this.imageData,
        newWidth: Polymer.dom(this).node.offsetWidth
      });
    },

    _dispatchBuildPalette(imageData) {
      // Then build the palette
      return this.dispatchWorker('buildPalette', {imageData, numColors: this.numcolors}, [imageData.data.buffer]);
    },

    _processImage({imageData, palette}){

      ::this._setupSuperPixelData(imageData, palette); // jshint ignore:line
      ::this._resizeOutputCanvas(imageData); // jshint ignore:line

      let context = this.$.finalOutput.getContext('2d');
      let splitHash = {
        imageData,
        numberOfParts: this.workers.length,
        pixelHeight: this.superPixelData.pixelHeight
      };

      for(let {chunk, chunkStartY} of this.splitGenerator.bind(this)(splitHash)){
        this._dispatchQuantize.bind(this)(chunk)
          .then(this._dispatchPixelate.bind(this))
          .then(({imageData})=> {
            context.putImageData(this._convertToRealImageData(imageData), 0,  chunkStartY);
            console.log('Wrote chunk at ' + (performance.now() - this.startTime) + ' milliseconds!');
          })
          .catch(this._catchErrors);
      }
    },

    _setupSuperPixelData(imageData, palette){
      this.palette = palette;
      this.superPixelData = {
        xPixels: this.gridwidth,
        yPixels: Math.floor(imageData.height * (this.gridwidth / imageData.width))
      };
      this.superPixelData.pixelWidth = Math.ceil(imageData.width / this.superPixelData.xPixels);
      this.superPixelData.pixelHeight =  Math.ceil(imageData.height / this.superPixelData.yPixels);
    },

    _resizeOutputCanvas(imageData){
      this.$.finalOutput.width = imageData.width;
      this.$.finalOutput.height = imageData.height;
    },

    _dispatchQuantize(chunk){
      return this.dispatchWorker('quantize', {
        imageData: chunk,
        palette: this.palette
      }, [chunk.data.buffer])
    },

    _dispatchPixelate({imageData}){
      return this.dispatchWorker('pixelate', {
        imageData,
        pixelWidth: this.superPixelData.pixelWidth,
        pixelHeight: this.superPixelData.pixelHeight,
        xPixels: this.superPixelData.xPixels,
        yPixels: this.superPixelData.yPixels,
      }, [imageData.data.buffer]);
    },

  });
})();
