function Picture({ name, alt, className, url }) {
  return (
    <picture className={className}>
      <source srcSet={`/${name}.avif`} type="image/avif" />
      <source srcSet={`/${name}.webp`} type="image/webp" />
      <img src={url ? url : `/${name}.png`} alt={alt} />
    </picture>
  );
}

export default Picture;
