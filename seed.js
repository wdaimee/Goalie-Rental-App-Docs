// This file allows you to seed arena details in to the database
require('dotenv').config();
require('./config/database');
const Arena = require('./models/Arena')

const arena_list = [
    {
        name: 'Burnhamthrope Community Centre',
        city: 'Mississauga',
        address: '1500 Gulleden Dr'
    },
    {
        name: 'Carmen Corbasson Community Centre',
        city: 'Mississauga',
        address: '1399 Cawthra Rd'
    },
    {
        name: 'Clarkson Community Centre',
        city: 'Mississauga',
        address: '2475 Truscott Dr'
    },
    {
        name: 'Erin Mills Twin Arena',
        city: 'Mississauga',
        address: '3205 Unity Dr'
    },
    {
        name: 'Huron Park Recreation Centre',
        city: 'Mississauga',
        address: '830 Paisley Boulevard W'
    },
    {
        name: 'Iceland Arena',
        city: 'Mississauga',
        address: '705 Matheson Boulevard E'
    },
    {
        name: 'Meadowvale 4 Rinks',
        city: 'Mississauga',
        address: '2160 Torquay Mews'
    },
    {
        name: 'Mississauga Valley Community Centre',
        city: 'Mississauga',
        address: '1275 Mississauga Valley Blvd'
    },
    {
        name: 'Paramount Fine Foods Centre',
        city: 'Mississauga',
        address: '5500 Rose Cherry Pl'
    },
    {
        name: 'Paul Coffey Arena',
        city: 'Mississauga',
        address: '3430 Derry Road E'
    },
    {
       name: 'Port Credit Memorial Arena',
       city: 'Mississauga',
       address: '40 Stavebank Road N' 
    },
    {
        name: 'South Common Community Centre',
        city: 'Mississauga',
        address: '2233 South Millway'
    },
    {
        name: 'Tomken Twin Arena',
        city: 'Mississauga',
        address: '4495 Tomken Rd'
    },
    {
        name: 'Agincourt Recreation Center',
        city: 'Toronto',
        address: '31 Glenn Waterford Dr'
    },
    {
        name: 'Albion Arena',
        city: 'Toronto',
        address: '1501 Albion Rd'
    },
    {
        name: 'Amesbury Sports Complex',
        city: 'Toronto',
        address: '155 Culford Rd'
    },
    {
        name: 'Angela James Arena',
        city: 'Toronto',
        address: '165 Grenoble Dr'
    },
    {
        name: 'Baycrest Arena',
        city: 'Toronto',
        address: '160 Neptune Dr'
    },
    {
        name: 'Bayview Arena',
        city: 'Toronto',
        address: '3230 Bayview Ave'
    },
    {
        name: 'Centennial Park Arena',
        city: 'Toronto',
        address: '156 Centennial Park Rd'
    },
    {
        name: 'Centennial Recreation Centre - Scarborough',
        city: 'Toronto',
        address: '1967 Ellesmere Rd'
    },
    {
        name: 'Central Arena',
        city: 'Toronto',
        address: '50 Montgomery Rd'
    },
    {
        name: 'Chris Tonks Arena',
        city: 'Toronto',
        address: '95 Black Creek Dr'
    }, 
    {
        name: 'Commander Recreation Centre',
        city: 'Toronto',
        address: '140 Commander Blvd'
    },
    {
       name: 'Don Mills Civitan Arena',
       city: 'Toronto',
       address: '1030 Don Mills Rd' 
    },
    {
        name: 'Downsview Arena',
        city: 'Toronto',
        address: '1633 Wilson Ave'
    },
    {
        name: 'East York Memorial Arena',
        city: 'Toronto',
        address: '888 Cosburn Ave'
    },
    {
        name: 'Fenside Arena',
        city: 'Toronto',
        address: '30 Slidell Cres'
    },
    {
        name: 'George Bell Arena',
        city: 'Toronto',
        address: '215 Ryding Ave'
    },
    {
        name: 'Gord and Irene Risk Community Centre',
        city: 'Toronto',
        address: '2650 Finch Ave W'
    },
    {
        name: 'Goulding Community Centre',
        city: 'Toronto',
        address: '45 Goulding Ave'
    },
    {
        name: 'Grandravine Community Recreation Centre',
        city: 'Toronto',
        address: '23 Grandravine Dr'
    },
    {
        name: 'Habitant Arena',
        city: 'Toronto',
        address: '2282 Weston Rd'
    },
    {
        name: 'Herbert H. Carnegie Centennial Centre',
        city: 'Toronto',
        address: '580 Fince Ave. W'
    },
    {
        name: 'Heron Park Community Centre',
        city: 'Toronto',
        address: '292 Manse Rd'
    },
    {
        name: 'John Booth Memorial Arena',
        city: 'Toronto',
        address: '230 Gosford Blvd'
    },
    {
        name: 'Lambton Arena',
        city: 'Toronto',
        address: '4100 Dundas St W'
    },
    {
        name: 'Larry Grossman Forest Hill Memorial Arena',
        city: 'Toronto',
        address: '340 Chaplin Cres'
    },
    {
        name: 'Leaside Memorial Gardens Arena',
        city: 'Toronto',
        address: '1073 Millwood Rd'
    },
    {
        name: 'Long Branch Arena',
        city: 'Toronto',
        address: '75 Arcadian Cir'
    },
    {
        name: 'Malvern Recreation Centre',
        city: 'Toronto',
        address: '30 Sewells Rd'
    }, 
    {
        name: 'McCormick Arena',
        city: 'Toronto',
        address: '179 Brock Ave'
    },
    {
        name: 'McGregor Park Community Centre',
        city: 'Toronto',
        address: '2231 Lawrence Ave E'
    },
    {
        name: 'Mimico Arena',
        city: 'Toronto',
        address: '31 Drummond St'
    },
    {
        name: 'Mitchell Field Community Centre',
        city: 'Toronto',
        address: '89 Church Ave'
    },
    {
        name: 'Moss Park Ave',
        city: 'Toronto',
        address: '140 Sherbourne St'
    },
    {
        name: 'North Toronto Memorial Arena',
        city: 'Toronto',
        address: '174 Orchard View Blvd'   
    },
    {
        name: 'Oriole Community Centre',
        city: 'Toronto',
        address: '2975 Don Mills Rd W'
    },
    {
        name: 'Park Lawn Bubble Rink',
        city: 'Toronto',
        address: '340 Park Lawn Rd'
    },
    {
        name: 'Phil White Arena',
        city: 'Toronto',
        address: '443 Arlington Ave'
    },
    {
        name: 'Pine Point Arena',
        city: 'Toronto',
        address: '15 Grierson Rd'
    },
    {
        name: 'Pleasantview Community Centre',
        city: 'Toronto',
        address: '545 Van Horne Ave'
    }, 
    {
        name: 'Roding Community Centre',
        city: 'Toronto',
        address: '600 Roding St'
    },
    {
        name: 'Scarborough Gardens Arena',
        city: 'Toronto',
        address: '75 Birchmount Rd'
    }, 
    {
        name: 'Scarborough Village Recreation Centre',
        city: 'Toronto',
        address: '3600 Kingston Rd'
    },
    {
        name: 'Ted Reeve Community Arena',
        city: 'Toronto',
        address: '175 Main St'
    },
    {
        name: 'Victoria Village Arena',
        city: 'Toronto',
        address: '190 Bermondsey Rd'
    },
    {
        name: 'Weston Lions Park',
        city: 'Toronto',
        address: '2125 Lawrence Ave W'
    },
    {
        name: 'William H. Bolton Arena',
        city: 'Toronto',
        address: '40 Rossmore Rd'
    },
    {
        name: 'York Mills Arena',
        city: 'Toronto',
        address: '2539 Bayview Ave'
    }
];

Arena.deleteMany({}, (err, arenas) => {
    console.log('removed all arenas');
    Arena.create(arena_list, (err, arenas) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('recreated all arenas');
        console.log(`created ${arenas.length}`);
    });
});