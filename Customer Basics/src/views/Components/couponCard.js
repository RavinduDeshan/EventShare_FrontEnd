import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getTime = (time) => {
  let timeReal = parseInt(time);
  if (timeReal > 12) {
    return timeReal - 12;
  } else return timeReal;
};

const getTimePeriod = (time) => {
  let timeReal = parseInt(time);
  if (timeReal > 12) {
    return "PM";
  } else return "AM";
};

const Container = styled.div`
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-position: center center;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 8px;
  position: relative;
  top: 50px;
  color: white;
  background-color: white;
  padding: 20px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.07);
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: ${(props) => props.color};
  margin: 10px;
`;

const Subtitle = styled.span`
  margin-top: 8px;
  font-size: 14px;
  display: block;
  color: ${(props) => props.color};
`;

const IconContainer = styled.div`
  cursor: pointer;
  color: ${(props) => props.color};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 100%;
`;

const SecondTitle = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
  display: block;
  font-weight: 500;
`;

const BtnRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Btn = styled.span`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  cursor: pointer;
`;

const ReviewsContainer = styled.div`
  margin-bottom: 15px;
  font-size: 10px;
  color: #9ca1ae;
  & span:last-child {
    margin-left: 5px;
  }
`;

const StarContainer = styled.span`
  color: #f4d931;
`;

const FullStar = () => (
  <StarContainer>
    <i className="fas fa-star" />
  </StarContainer>
);

const HalfStar = () => (
  <StarContainer>
    <i className="fas fa-star-half" />
  </StarContainer>
);

const Card15 = ({
  name,
  value,
  points,
  titleColor = "#1F2126",
  subtitleColor = "#9CA1AE",
  iconName,
  iconSize = 2,
  iconColor = "white",
  bgPhoto,
  secondTitle,
  secondTitleColor = "#1F2126",
  btnBg = "#006EFE",
  btnColor = "white",
  btnIcon,
  ratingAverage,
  totalReviews,
  time,
  colorTitle,
  TicketTitle,
}) => (
  <Container bgPhoto={bgPhoto}>
    {name && (
      <Content>
        {name && <Title color={titleColor}>{name}</Title>}
        {points && (
          <>
            <Title color={colorTitle}>
              <b> {points} Points </b>
            </Title>
          </>
        )}
        {(value || btnIcon) && (
          <BtnRow>
            {value && (
              <>
                <Title color={"black"}>
                  Discount: <b> {value} $ </b>
                </Title>
              </>
            )}
            {/* {btnIcon && (
              <Btn color={btnColor} bgColor={btnBg}>
                <i className={btnIcon} />
              </Btn>
            )} */}
          </BtnRow>
        )}
      </Content>
    )}
  </Container>
);

Card15.propTypes = {
  title: PropTypes.string,

  subtitle: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  bgPhoto: PropTypes.string,
  btnBg: PropTypes.string,
  btnColor: PropTypes.string,
  btnIcon: PropTypes.string,
  secondTitle: PropTypes.string,
  secondTitleColor: PropTypes.string,
  ratingAverage: PropTypes.oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
  totalReviews: PropTypes.number,
};

export default Card15;
