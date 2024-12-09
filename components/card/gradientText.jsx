const GradientText = ({text, style}) => {
    return (
        <span
            className={`text-transparent bg-clip-text
                        animate-gradient-text bg-[length:400%_400%]`}
            style={style}>
            {text}
        </span>
    )
};

export default GradientText;