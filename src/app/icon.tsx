import { ImageResponse } from 'next/server'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return {
    body: (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        AI
      </div>
    ),
    headers: {
      'Content-Type': contentType,
      'Content-Length': `${size.width}x${size.height}`,
    },
  }
}