export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'Free Public Upload')

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dcjzqwkxh/image/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Failed to upload image')

    const data = await response.json()
    return data.secure_url
  } catch (err) {
    throw err
  }
}
