export const Application = () => {
    return(
        <form>
            <div>
                <label htmlFor="name">First Name:</label>
                <input type="text" id="name" />
            </div>
            <div>
                <label htmlFor="ljob-location">Job Location:</label>
                <select id="job-location">
                    <option value="">Select a county</option>
                    <option value="US">USA</option>
                    <option value="GB">UK</option>
                </select>
            </div>
            <div>
                <label>
                    <input type="checkbox" id="terms" /> I agree to the terms and Conditions
                </label> 
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}