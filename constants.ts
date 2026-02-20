import { AmbulanceLocation } from './types';

export const API_BASE_URL = 'https://api-alwayscare.arham.org/api';

export const AMBULANCE_DATA: AmbulanceLocation[] = [
  // Gujarat — Arham Yuva Seva Group
  { id: '1', city: 'Ahmedabad', phone: '6262 0909 15', state: 'Gujarat', lat: 23.0225, lng: 72.5714, category: 'Animal Ambulance', areaOfOperations: 'Satellite, Bopal, Jivrajpark, Sela, South Bopal, Vastrapur, Vejalpur, Ramdevnagar, Bodakdev, Thaltej, Ghuma, Ambli', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'AHEMDABAD' },
  { id: '2', city: 'Bhavnagar', phone: '8989 8080 46', state: 'Gujarat', lat: 21.7645, lng: 72.1519, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Bhavnagar' },
  { id: '3', city: 'Gondal', phone: '6262 0909 89', state: 'Gujarat', lat: 21.9619, lng: 70.7923, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Gondal' },
  { id: '4', city: 'Junagadh', phone: '9913 9101 08', state: 'Gujarat', lat: 21.5222, lng: 70.4579, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Junagadh' },
  { id: '5', city: 'Mandvi - Kutch', phone: '8585 0202 63', state: 'Gujarat', lat: 22.8400, lng: 69.3500, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Mandvi' },
  { id: '6', city: 'Palitana', phone: '6262 8080 03', state: 'Gujarat', lat: 21.5200, lng: 71.8200, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Palitana' },
  { id: '7', city: 'Surat', area: 'Vesu', phone: '8689 8905 05', state: 'Gujarat', lat: 21.1500, lng: 72.7800, category: 'Animal Ambulance', areaOfOperations: 'Vesu', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'VESU' },
  { id: '8', city: 'Surat', area: 'Varachha', phone: '8989 0505 81', state: 'Gujarat', lat: 21.2100, lng: 72.8600, category: 'Animal Ambulance', areaOfOperations: 'Varachha', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'VARACHA' },
  { id: '9', city: 'Vadodara', phone: '8989 0303 73', state: 'Gujarat', lat: 22.3072, lng: 73.1812, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Vadodara' },
  { id: '10', city: 'Veraval', phone: '6262 0505 90', state: 'Gujarat', lat: 20.9159, lng: 70.3629, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Veraval' },
  { id: '11', city: 'Gandhinagar', phone: '6262 0606 74', state: 'Gujarat', lat: 23.2156, lng: 72.6369, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Gandhinagar' },
  { id: '12', city: 'Morbi', phone: '6262 8080 03', state: 'Gujarat', lat: 22.8173, lng: 70.8370, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Morbi' },

  // Maharashtra — Arham Yuva Seva Group
  { id: '13', city: 'Mumbai', area: 'Kandivali', phone: '9619 6197 21', state: 'Maharashtra', lat: 19.2045, lng: 72.8376, category: 'Animal Ambulance', areaOfOperations: 'Borivali, Dahisar', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Kandivali' },
  { id: '14', city: 'Mumbai', area: 'Malad', phone: '7662 00 5402', state: 'Maharashtra', lat: 19.1874, lng: 72.8489, category: 'Animal Ambulance', areaOfOperations: 'Malad, Kandivali', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Malad' },
  { id: '15', city: 'Mumbai', area: 'Mira Road', phone: '7662 00 5403', state: 'Maharashtra', lat: 19.2813, lng: 72.8561, category: 'Animal Ambulance', areaOfOperations: 'Mira Road, Bhayandar', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Mira road' },
  { id: '16', city: 'Mumbai', area: 'Andheri', phone: '7662 00 5401', state: 'Maharashtra', lat: 19.1136, lng: 72.8697, category: 'Animal Ambulance', areaOfOperations: 'Andheri West, Vile Parle West, Juhu, Santacruz West, Jogeshwari West, Lokhandwala', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Andheri' },
  { id: '17', city: 'Mumbai', area: 'Ghatkopar', phone: '7662 00 5404', state: 'Maharashtra', lat: 19.0860, lng: 72.9090, category: 'Animal Ambulance', areaOfOperations: 'Ghatkopar, Vikhroli', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Ghatkopar' },
  { id: '18', city: 'Mumbai', area: 'Chembur', phone: '7662 00 5405', state: 'Maharashtra', lat: 19.0522, lng: 72.9005, category: 'Animal Ambulance', areaOfOperations: 'Chembur', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Chembur' },
  { id: '19', city: 'Mumbai', area: 'Mulund', phone: '7662 00 5406', state: 'Maharashtra', lat: 19.1726, lng: 72.9425, category: 'Animal Ambulance', areaOfOperations: 'Mulund, Bhandup, Nahur', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Mulund' },
  { id: '20', city: 'Mumbai', area: 'Dombivali', phone: '7662 00 5407', state: 'Maharashtra', lat: 19.2183, lng: 73.0867, category: 'Animal Ambulance', areaOfOperations: 'Dombivali', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Thane' },
  { id: '21', city: 'Mumbai', area: 'Tardeo', phone: '7662 00 5408', state: 'Maharashtra', lat: 18.9716, lng: 72.8127, category: 'Animal Ambulance', areaOfOperations: 'Tardeo', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Tardev' },
  { id: '22', city: 'Mumbai', area: 'Vasai', phone: '7662 00 5409', state: 'Maharashtra', lat: 19.3919, lng: 72.8397, category: 'Animal Ambulance', areaOfOperations: 'Vasai, Nalasopara', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Dadar' },
  { id: '23', city: 'Mumbai', area: 'Nasik Highway', phone: '8989 0909 67', state: 'Maharashtra', lat: 19.9975, lng: 73.7898, category: 'Animal Ambulance', areaOfOperations: 'Padgha, Nashik Highway', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Paramdham' },
  { id: '24', city: 'Pune', area: 'PMC', phone: '8989 0303 90', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, category: 'Animal Ambulance', areaOfOperations: 'Swargate, Dhankawadi, Kondwa, Yewalewadi, Ambegaon, Handewadi, Ghorpadi', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'PMC' },
  { id: '25', city: 'Pune', area: 'PCMC', phone: '8989 0303 17', state: 'Maharashtra', lat: 18.6298, lng: 73.7997, category: 'Animal Ambulance', areaOfOperations: 'Pimpri Chinchwad, Dehu Road, Bhosari, Mamurdi, Baner, Khadki, Hinjewadi', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'PCMC' },
  { id: '26', city: 'Nagpur', phone: '9090 6767 08', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Nagpur' },
  { id: '27', city: 'Solapur', phone: '6262 0909 12', state: 'Maharashtra', lat: 17.6599, lng: 75.9064, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Solapur' },
  { id: '28', city: 'Amravati', phone: '6262 0505 46', state: 'Maharashtra', lat: 20.9320, lng: 77.7523, category: 'Animal Ambulance', areaOfOperations: 'Entire City', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Amravati' },

  // Other States — Arham Yuva Seva Group
  { id: '29', city: 'Delhi', area: 'Old Delhi', phone: '8989 0808 78', state: 'Other', lat: 28.6139, lng: 77.2090, category: 'Animal Ambulance', areaOfOperations: 'Shalimar Bagh, Ashok Vihar, Model Town, Rana Pratap Bagh, Shakti Nagar, Kamla Nagar, Karal Bagh, Patel Nagar', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Delhi' },
  { id: '30', city: 'Chennai', phone: '9566 5080 46', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, category: 'Animal Ambulance', areaOfOperations: 'Choolai, Sowcarpet, Central-Egmore, Kilpauk, Ayanavaram, Puraisaiwakkam', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Chennai' },
  { id: '31', city: 'Hyderabad', phone: '6262 0909 70', state: 'Other', lat: 17.3850, lng: 78.4867, category: 'Animal Ambulance', areaOfOperations: 'Nampally, Lakdikapul, Basheerbagh, Himayatnagar, Narayanguda, Musheerabad, Kavadiguda, Ranigunj', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Hyderabad' },
  { id: '32', city: 'Indore', phone: '8989 0808 48', state: 'Other', lat: 22.7196, lng: 75.8577, category: 'Animal Ambulance', areaOfOperations: 'Devas Naka, Vijay Nagar, Bengali Square, Bhavar Kuva, Nepaniya, Rajiv Gandhi Square', operatedBy: 'Arham Yuva Seva Group', deviceMatch: 'Indore' },
  { id: '33', city: 'Kolkata', phone: '9090 6262 79', state: 'West Bengal', lat: 22.5726, lng: 88.3639, category: 'Animal Ambulance', areaOfOperations: 'Hazra, Bhowanipore, Behala, Rashbehari, Tollygunge, Minto Park, Elin Road, Chowinee, Beckbagan', operatedBy: 'Arham Yuva Seva Group' },

  // NGO Partners
  { id: '34', city: 'Kolkata', area: 'Chayya Animal Hospital', phone: '9830 2111 38', state: 'West Bengal', lat: 22.55, lng: 88.35, category: 'Animal Ambulance', areaOfOperations: '', operatedBy: 'Chayya Animal Hospital' },
  { id: '35', city: 'Kolkata', area: 'Chayya Animal Hospital', phone: '9830 2111 38', state: 'West Bengal', lat: 22.56, lng: 88.36, category: 'Rescue Ambulance', areaOfOperations: '', operatedBy: 'Chayya Animal Hospital' },
  { id: '36', city: 'Bengaluru', area: 'ALAI Trust', phone: '9739 2882 82', state: 'Karnataka', lat: 12.9716, lng: 77.5946, category: 'Animal Ambulance', areaOfOperations: '', operatedBy: 'ALAI Trust' },
  { id: '37', city: 'Bengaluru', area: 'Friend for Animal Trust', phone: '8147 6200 03', state: 'Karnataka', lat: 13.0, lng: 77.6, category: 'Animal Ambulance', areaOfOperations: '', operatedBy: 'Friend for Animal Trust' },
  { id: '38', city: 'Mumbai', area: 'Wadala', phone: '9167 1191 35', state: 'Maharashtra', lat: 19.0216, lng: 72.8646, category: 'Animal Ambulance', areaOfOperations: 'Wadala', operatedBy: 'Hope for Indies Trust' },
  { id: '39', city: 'Rajkot', area: 'Sadbhavna Vrudhashram', phone: '7984 8276 33', state: 'Gujarat', lat: 22.3039, lng: 70.8022, category: 'Hydraulic Ambulance', areaOfOperations: '', operatedBy: 'Sadbhavna Vrudhashram' },
  { id: '40', city: 'Rajkot', area: 'Jeev Daya Ghar Panjrapole', phone: '9664 5541 55', state: 'Gujarat', lat: 22.25, lng: 70.75, category: 'Hydraulic Ambulance', areaOfOperations: '', operatedBy: 'Jeev Daya Ghar Panjrapole' },
  { id: '41', city: 'Jamnagar', area: 'K9 Safe Animal', phone: '8238 1135 55', state: 'Gujarat', lat: 22.4707, lng: 70.0577, category: 'Animal Ambulance', areaOfOperations: '', operatedBy: 'K9 Safe Animal - Vision Gaushala' },
  { id: '42', city: 'Vapi', area: 'Tinku Memorial', phone: '8980 8388 88', state: 'Gujarat', lat: 20.3893, lng: 72.9106, category: 'Hydraulic Ambulance', areaOfOperations: '', operatedBy: 'Tinku Memorial' },
  { id: '43', city: 'Gurugram', phone: '9999 9565 41', state: 'Haryana', lat: 28.4595, lng: 77.0266, category: 'Hydraulic Ambulance', areaOfOperations: '', operatedBy: 'Umeed' },
  { id: '44', city: 'Chennai', area: 'Blue Cross', phone: '9962 9988 86', state: 'Tamil Nadu', lat: 13.0, lng: 80.25, category: 'Hydraulic Ambulance', areaOfOperations: '', operatedBy: 'Blue Cross' },
];

export const CLINIC_DATA: AmbulanceLocation[] = [
  { id: 'c1', city: 'Rajkot', area: 'Arham Always Care Clinic', phone: '7567 0756 80', state: 'Gujarat', lat: 22.3039, lng: 70.8022, type: 'clinic', category: 'Clinic', areaOfOperations: '', operatedBy: 'Arham Yuva Seva Group' },
  { id: 'c2', city: 'Mumbai', area: 'Ghatkopar', phone: '7463 0363 03', state: 'Maharashtra', lat: 19.0860, lng: 72.9090, type: 'clinic', category: 'Clinic', areaOfOperations: '', operatedBy: 'Arham Yuva Seva Group' },
  { id: 'c3', city: 'Mumbai', area: 'Kandivali (Pawandham)', phone: '7304 9838 22', state: 'Maharashtra', lat: 19.2045, lng: 72.8376, type: 'clinic', category: 'Clinic', areaOfOperations: '', operatedBy: 'Arham Yuva Seva Group' },
  { id: 'c4', city: 'Junagadh', area: 'Arham Always Care Clinic', phone: '9913 9101 08', state: 'Gujarat', lat: 21.5222, lng: 70.4579, type: 'clinic', category: 'Clinic', areaOfOperations: '', operatedBy: 'Arham Yuva Seva Group' },
  { id: 'c5', city: 'Mumbai', area: 'Paramdham', phone: '6262 0909 72', state: 'Maharashtra', lat: 19.9975, lng: 73.7898, type: 'clinic', category: 'Clinic', areaOfOperations: '', operatedBy: 'Arham Yuva Seva Group' },
];

export const NAV_LINKS = [
  { name: 'Live Impact', href: '/live-impact', type: 'route' as const },
  { name: 'Ambulances', href: '/#home', type: 'anchor' as const },
  { name: 'Volunteer', href: '/#volunteer', type: 'anchor' as const },
];