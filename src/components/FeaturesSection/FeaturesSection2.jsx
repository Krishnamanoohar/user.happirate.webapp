import React from "react";
import ProfileCard from "../../ReactBitsComps/ProfileCard/ProfileCard";

const FeaturesSection2 = () => {
  const loanCards = [
    {
      title: "Personal Loan",
      description:
        "Get instant access to funds for your goals — from travel to home upgrades — with simple steps, transparent rates, and zero hidden charges.",
      imgSrc: "businessLoan.jpg",
    },
    {
      title: "Business Loan",
      description:
        "Fuel your business growth with quick, collateral-free funding and flexible repayment options — designed for entrepreneurs who dream big.",
      imgSrc: "businessLoan.jpg",
    },
    {
      title: "Vehicle Loan",
      description:
        "Drive home your dream car or bike with fast approvals, low EMIs, and complete transparency from start to finish.",
      imgSrc: "businessLoan.jpg",
    },
    {
      title: "Education Loan",
      description:
        "Invest in your future with easy, affordable education loans — covering tuition, living, and travel expenses with flexible repayment terms.",
      imgSrc: "businessLoan.jpg",
    },
  ];
  return (
    <div className="dark-background">
      <div className="container">
        <div className="section-title">
          <h2 className="text-2xl font-semibold text-center mb-0">Solutions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 py-6 rounded-2xl">
          {/* <ProfileCard
            name="Javi A. Torres"
            title="Software Engineer"
            handle="javicodes"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/path/to/avatar.jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          /> */}
          {loanCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col border border-white rounded-2xl hover:scale-105 transition duration-200 cursor-pointer"
            >
              <div className="rounded-2xl relative">
                <img
                  src={`assets/img/${card.imgSrc}`}
                  alt=""
                  className="rounded-t-2xl"
                />
                <div className="h-full w-full bg-red-50 absolute top-0 left-0 opacity-50 rounded-t-2xl"></div>
              </div>

              <div className="h-24 w-24 ml-6 relative top-[-50px] p-1 rounded-2xl bg-white">
                <img
                  src="assets/img/avatar-1.webp"
                  alt=""
                  className="rounded-2xl"
                />
              </div>

              <div className="flex flex-col justify-between p-4 pt-0 text-white h-full rounded-t-2xl">
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <button className="vibrant-shadow-btn">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection2;
