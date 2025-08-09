import Image from 'next/image'

type Props = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

const blurDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'

export default function OptimizedImage({ src, alt, className, priority = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={className}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  )
}


