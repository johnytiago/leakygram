import { useState } from 'react';

export default function GeneratePostPage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImage(file);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const postData = {
        text,
        image: base64Image,
      };

      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          setStatus('Post created successfully!');
          setText('');
          setImage(null);
          setImagePreview(null);
        } else {
          setStatus('Failed to create post.');
        }
      } catch (error) {
        console.error('Error creating post:', error);
        setStatus('Failed to create post.');
      }
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      setStatus('Please upload an image.');
    }
  };

  return (
    <div className="generate-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} className="generate-post-form">
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="form-control"
          />
        </div>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Image Preview" />
          </div>
        )}
        <button type="submit" className="btn">Submit</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}