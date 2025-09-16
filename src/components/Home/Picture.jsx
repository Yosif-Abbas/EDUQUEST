function Picture({ name, alt, className }) {
  return (
    <picture className={className}>
      <source srcSet={`/${name}.avif`} type="image/avif" />
      <source srcSet={`/${name}.webp`} type="image/webp" />
      <img src={`/${name}.png`} alt={alt} />
    </picture>
  );
}

export default Picture;
