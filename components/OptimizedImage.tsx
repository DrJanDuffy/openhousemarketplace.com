import Image from 'next/image'

type Props = {
  src: string
  alt: string
  /** Extra classes on the image (e.g. hover). */
  className?: string
  priority?: boolean
  /**
   * When true, no outer aspect box — parent must be `relative` with its own aspect/size (e.g. aspect-video).
   */
  fillParent?: boolean
}

const blurDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'

const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  fillParent = false,
}: Props) {
  if (fillParent) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={defaultSizes}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={defaultSizes}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}


