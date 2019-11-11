import { gql } from "apollo-boost";

export const PILOT_OVERVIEW = gql`
  {
    account {
      users(id: 8) {
        flights {
          duration
        }
        first_name
        last_name
        email
      }
    }
  }
`;

export const IN_DEPTH_FLIGHTS = gql`
  {
    account {
      users(id: 8) {
        first_name
        last_name
        flights {
          duration
          id
          latitude
          longitude
          notes
          location {
            name
            id
            notes
          }
          batteries {
            manufacturer
            name
            serial_number
          }
          aircraft {
            model
            name
            manufacturer
            serial_number
          }
        }
      }
    }
  }
`;

export const FLIGHT_STATS = gql`
  {
    account {
      users(id: 8) {
        flights {
          duration
        }
      }
    }
  }
`;
