export default class Build {
    constructor(
        public id: string,
        public name: string, 
        public localization: string,
        public tags: [string],
        public architecture: string,
        public landscaping: string,
        public release?: number, 
        public deliveryForecast?: number,
        public images?: [string],
    ){}
}