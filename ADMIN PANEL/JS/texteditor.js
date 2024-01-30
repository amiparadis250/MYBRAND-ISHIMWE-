
  document.addEventListener('DOMContentLoaded', function () {
      var imageButton = document.getElementById('insertImage');
      var imageInput = document.getElementById('imageInput');
      var contentEditable = document.getElementById('blog-body');
      var fontSizeDropdown = document.getElementById('fontSize');
      var foreColorPicker = document.getElementById('foreColor');

      // Event listener for image button click
      imageButton.addEventListener('click', function () {
          imageInput.click(); // Trigger the file input click
      });

      // Event listener for image input change
      imageInput.addEventListener('change', function (event) {
          var file = event.target.files[0];
          if (file) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  var img = new Image();
                  img.src = e.target.result;
                  img.style.maxWidth = '50%'; // Set your desired max width
                  img.style.height = 'auto'; // Maintain aspect ratio

                  // Customize the insertion point based on your needs
                  var insertionPoint = getInsertionPoint(contentEditable);

                  // Insert the image at the customized insertion point
                  contentEditable.focus();
                  var selection = window.getSelection();
                  var range = selection.getRangeAt(0);
                  range.setStart(insertionPoint.container, insertionPoint.offset);
                  range.deleteContents();
                  range.insertNode(img);

                  // Move the caret after the image
                  range.setStartAfter(img);
                  range.collapse(true);
                  selection.removeAllRanges();
                  selection.addRange(range);
              };
              reader.readAsDataURL(file);
          }
      });

      // Function to customize the insertion point based on your needs
      function getInsertionPoint(contentEditable) {
          // You can customize this function to determine where the image should be inserted
          // For example, you might want to insert the image at the current caret position
          var selection = window.getSelection();
          return {
              container: selection.focusNode,
              offset: selection.focusOffset
          };
      }

      // Event listeners for text formatting
      document.getElementById('bold').addEventListener('click', function () {
          document.execCommand('bold', false, null);
      });

      document.getElementById('italic').addEventListener('click', function () {
          document.execCommand('italic', false, null);
      });

      document.getElementById('underline').addEventListener('click', function () {
          document.execCommand('underline', false, null);
      });

      // Event listeners for alignment and spacing
      document.getElementById('justifyLeft').addEventListener('click', function () {
          document.execCommand('justifyLeft', false, null);
      });

      document.getElementById('justifyCenter').addEventListener('click', function () {
          document.execCommand('justifyCenter', false, null);
      });

      document.getElementById('justifyRight').addEventListener('click', function () {
          document.execCommand('justifyRight', false, null);
      });

      document.getElementById('justifyFull').addEventListener('click', function () {
          document.execCommand('justifyFull', false, null);
      });

      document.getElementById('indent').addEventListener('click', function () {
          document.execCommand('indent', false, null);
      });

      document.getElementById('outdent').addEventListener('click', function () {
          document.execCommand('outdent', false, null);
      });

      // Event listeners for font size and font color
      fontSizeDropdown.addEventListener('change', function () {
          var fontSize = this.value;
          document.execCommand('fontSize', false, fontSize);
      });

      foreColorPicker.addEventListener('input', function () {
          var foreColor = this.value;
          document.execCommand('foreColor', false, foreColor);
      });

      // Event listeners for other functionalities
      document.getElementById('superscript').addEventListener('click', function () {
          document.execCommand('superscript', false, null);
      });

      document.getElementById('subscript').addEventListener('click', function () {
          document.execCommand('subscript', false, null);
      });

      document.getElementById('insertOrderedList').addEventListener('click', function () {
          document.execCommand('insertOrderedList', false, null);
      });

      document.getElementById('insertUnorderedList').addEventListener('click', function () {
          document.execCommand('insertUnorderedList', false, null);
      });

      document.getElementById('undo').addEventListener('click', function () {
          document.execCommand('undo', false, null);
      });

      document.getElementById('redo').addEventListener('click', function () {
          document.execCommand('redo', false, null);
      });

      document.getElementById('createLink').addEventListener('click', function () {
          var url = prompt('Enter the URL:');
          if (url) {
              document.execCommand('createLink', false, url);
          }
      });

      document.getElementById('unlink').addEventListener('click', function () {
          document.execCommand('unlink', false, null);
      });
  });

  function handleFontSize() {
      var fontSize = prompt("Enter font size:");
      document.execCommand('fontSize', false, fontSize);
  }

  function handleFontColor() {
      var fontColor = prompt("Enter font color:");
      document.execCommand('foreColor', false, fontColor);
  }

  // Add event listeners to the buttons
  document.getElementById('fontSize').addEventListener('click', handleFontSize);
  document.getElementById('foreColor').addEventListener('click', handleFontColor);