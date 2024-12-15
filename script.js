const imgbbApiKey = '02cdfa82d94696cb728b81002a3def9c'; // Replace with your ImgBB API key
const uploadButton = document.getElementById('imageUpload');
const previewDiv = document.getElementById('preview');
const loader = document.getElementById('loader');
const linkContainer = document.getElementById('linkContainer');
const imageURLInput = document.getElementById('imageURL');
const copyButton = document.getElementById('copyButton');

// Upload and Preview Image
uploadButton.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewDiv.innerHTML = `<img src="${e.target.result}" alt="Image Preview" style="max-width: 100%; border-radius: 10px;">`;
    };
    reader.readAsDataURL(file);

    loader.style.display = 'flex';

    // Upload image to ImgBB
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      loader.style.display = 'none';

      if (data.success) {
        const imageUrl = data.data.url;
        imageURLInput.value = imageUrl;
        linkContainer.style.display = 'flex';
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      loader.style.display = 'none';
      alert('An error occurred while uploading the image.');
    }
  }
});

// Copy Link to Clipboard
copyButton.addEventListener('click', () => {
  imageURLInput.select();
  document.execCommand('copy');
  copyButton.textContent = 'Copied!';
  setTimeout(() => {
    copyButton.textContent = 'Copy Link';
  }, 2000);
});
