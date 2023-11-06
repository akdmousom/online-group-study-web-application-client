const Feature = () => {
    return (
        <>
            <h1 className="text-center py-8 text-4xl font-bold">Frequently Asked Questions</h1>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-center  font-medium">
                    Can I use this application for free?
                </div>
                <div className="collapse-content">
                    <p className="text-center">Yes you can use this application for free</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-center font-medium">
                    Can I post all my assignments with this application?
                </div>
                <div className="collapse-content">
                    <p className="text-center">Yes you can.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-center font-medium">
                    What is the function of this application?
                </div>
                <div className="collapse-content">
                    <p className="text-center">With this you can post your assignments very easily and you can also challenge others</p>
                </div>
            </div>
        </>
    );
};

export default Feature;