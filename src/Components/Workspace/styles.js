const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    margin: 0,
  },
  selected: {},
  tabTitle: {
    width: '25%',
    maxWidth: 'none',
  },
  card: {
    flexGrow: 1,
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  substrategycard: {
    flexGrow: 1,
    padding: 16,
    marginTop: `${theme.spacing.unit * 1}px`,
    marginBottom: `${theme.spacing.unit * 1}px`,
  },
  buttonList: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  buttonGrid: {
    marginTop: -20,
  },
  title: {
    marginTop: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    paddingRight: theme.typography.pxToRem(20)
  },
  subheading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    fontWeight: '300',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    paddingRight: theme.typography.pxToRem(20)
  },
  avatar: {
    margin: 2,
  },
  strategyAvatar: {
    margin: 0,
    width: 18,
    height: 18,
  },
  backLink: {
    textDecoration: 'none',
    margin: `0 ${theme.spacing.unit * 1}px 0`,
    color: theme.palette.secondary.main
  },
  nested: {
    paddingLeft: theme.spacing.unit * 3,
  },
  nestedSituation: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#F9F9F9'
  },
  strategyItem: {
    width: '100%'
  },
  itemTopTier:{
    backgroundColor: '#F1F1F1',
    "&$itemTopTierSelected": {
      backgroundColor: '#DDD'
    },
    "&$itemTopTierSelected:hover": {
      backgroundColor: '#aaa'
    }
  },
  itemTopTierSelected:{},
  itemFirstTier:{
    backgroundColor: '#F9F9F9',
    "&$itemFirstTierSelected": {
      backgroundColor: '#fba8a8'
    },
    "&$itemFirstTierSelected:hover": {
      backgroundColor: '#aaa'
    }
  },
  itemFirstTierSelected:{},
  itemSecondTier:{
    backgroundColor: '#FCFCFC',
    "&selected": {
      backgroundColor: '#FFF'
    },
    "&$itemSecondTierSelected": {
      backgroundColor: '#fba8a8'
    },
    "&$itemSecondTierSelected:hover": {
      backgroundColor: '#aaa'
    }
  },
  itemSecondTierSelected:{},
  strategyList: {
    padding: theme.spacing.unit * 1,
    width: '100%'
  },
  teamsListWrapper:{
    padding: theme.spacing.unit * 5,
  },
  teamsList:{
    border: '1px solid #CCC',
  },
  editNext:{
    paddingTop: 10,
    paddingRight: 0,
    fontSize: 36,
  },
  editBttnContainer:{
    paddingRight: 5,
  },
  editBttn:{
    color: '#666',
    padding: 0,
    minWidth: 32,
  },
  addBttn:{
    minWidth: 48,
  },
  editBttnLabel:{
    fontSize: 20,
  },
  popover: {
    pointerEvents: 'none',
    position: 'absolute'
  },
  paper: {
    padding: theme.spacing.unit,
  },
  loadContainer: {
    padding: theme.spacing.unit * 5,
  },
});

export default styles;
