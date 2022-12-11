import logo from "./logo.svg";
import "./App.css";
import { Slider } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withUAL } from "ual-reactjs-renderer";
import Swal from "sweetalert2";
import ReactTooltip from "react-tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "@material-ui/core/Drawer";
import ReactGA from "react-ga";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Promise } from "bluebird";
import Poll from "./Poll";
import Countdown from "react-countdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import EndpointSetter from "./EndpointSetter";



//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CachedIcon from "@material-ui/icons/Cached";
import Switch from "@mui/material/Switch";

const CustomSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CssTextField = styled(TextField)({
  "& .css-18m8r0v": {
    color: "#5A83F1",
  },
  "& .MuiInputAdornment-root": {
    color: "#5A83F1",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "14px",
    width: "100%",
  },
  heading: {
    fontSize: "14px",
    color: "#534C80",
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
  },
  summary: {
    padding: 0,
  },
  slider2: {
    color: "#7FAAF5",
  },
  circleprog: {
    color: "#7FAAF5",
  },
  expansion: {
    backgroundColor: "rgba( 255, 255, 255, 0 )",
    boxShadow: "none",
    borderRadius: "100px",
    marginLeft: 0,
  },
  expansion2: {
    fontSize: "10px",
  },
}));

function App(props) {
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const [tabbutton, setTabbutton] = useState("invest");
  const [show22, setShow22] = useState(false);
  const [depositamounteosetf, setDepositamounteosetf] = useState();
  const [depositamounteos, setDepositamounteos] = useState(parseFloat(100.0000).toFixed(4));
  const [selltokenamount, setSelltokenamount] = useState(1);

  const handleShow22 = () => setShow22(true);
  const handleClose22 = () => {
    setShow22(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  const classes = useStyles();

  const {
    ual: { showModal, hideModal, activeUser, login, logout },
  } = props;
  if (activeUser) {
    const accountName = activeUser.getAccountName();
    accountName.then(function (result) {
      setAccountName(result);
    });
  }
  const displayaccountname = () => {
    if (accountname) {
      return accountname;
    }
  };
  const [drawerstate, setDrawerstate] = useState(false);
  const [tokens, setTokens] = useState(1);
  const [inliquidity, setInliquidity] = useState(0);
  const [myshare, setMyshare] = useState(0);
  const [stake, setStake] = useState(0);
  const [stakemax, setStakemax] = useState(0);
  const [timetilnext, setTimetilnext] = useState(0);
  const [displaytime, setDisplaytime] = useState(0);
  const [staketable, setStaketable] = useState();
  const [redeemtokens, setRedeemtokens] = useState(0);
  const [view, setView] = useState("create");
  const [accountname, setAccountName] = useState("");

  const logmeout = () => {
    logout();
    setAccountName("");
  };

  const logmein = async () => {
    await showModal()
    setRefresh(refresh + 1)
  }

  const redemptionfee = 0.95;
  const efxmult = 2.6911;
  const dadmult = 0.880282;
  const iqmult = 26.233;
  const vigmult = 125.0;
  const dappmult = 12.6263;
  const boxmult = 0.036075;
  const ogxmult = 2.13675214;

  const chexmult = 56.9476082;
  const pizzamult = 4.4696;
  const dfsmult = 0.014;
  const emtmult = 16.3399;
  const dexmult = 3.385;
  const tptmult = 17.9856;

  const swal_success = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
  };

  const swal_error = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: message,
    });
  };

  const sucessstake = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "EOSETF successfully issued!",
    });
  };

  const sucessredemption = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Tokens successfully redeemed!",
    });
  };

  const actionpuccis = (err) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: err,
    });
  };

  const [govrnprice, setGovrnprice] = useState({ rows: [] });
  const [dadpriceeos, setDadprice] = useState({ rows: [] });
  const [eosetfprice, setEosetfprice] = useState({ rows: [] });
  const [etfprice, setEtfprice] = useState();
  const [periodbutton, setPeriodbutton] = useState("a year");

  const [prices, setPrices] = useState([]);
  const [chartprices, setChartPrices] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [eosusdt, setEosusdt] = useState();
  const [dividendflag, setDividendflag] = useState();
  const [dividendflagcetf, setDividendflagcetf] = useState();

  const [eosetfbalance, setEosetf] = useState({ rows: [] });
  const [etfbalance, setEtf] = useState({ rows: [] });
  const [eosetfbalanceind, setEosetfind] = useState({ rows: [] });
  const [etfbalanceind, setEtfind] = useState({ rows: [] });

  const [dividendclaim, setDividendclaim] = useState(0);
  const [fulldata, setFulldata] = useState([]);
  const [fulldataprices, setFulldataprices] = useState();
  const [portfoliodata, setPortfoliodata] = useState();
  const [withdrawamounts, setWithdrawamounts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [historicalprices, setHistoricalprices] = useState();

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSwitchChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  const Completionist = () => (
    <div class="flexalign">
      <div class="stakestat">Period has ended!</div>
      <div class="stakedescriptor">Claim dividend to start new period.</div>
    </div>
  );

  const endpoint = "https://api.main.alohaeos.com";
  //  const endpoint = localStorage.getItem("endpoint");
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div class="flexalign">
          <div class="stakestat">
            {hours}:{minutes}:{seconds}
          </div>
          <div class="stakedescriptor">Time until end of period</div>
        </div>
      );
    }
  };

  useEffect(async () => {
    const block_time = 3;
    const year_blocks = 31104000 / block_time;
    const six_month_blocks = 15552000 / block_time;
    const month_blocks = 2592000 / block_time;
    let headblock;

    await fetch(`${endpoint}/v1/chain/get_info`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((info) => {
        headblock = info.head_block_num;
      })
    );
    const year_blocks_ago = headblock - year_blocks;
    const six_month_blocks_ago = headblock - six_month_blocks;
    const month_blocks_ago = headblock - month_blocks;
    let year_price;
    let six_month_price;
    let month_price;
    let current_price;

    await fetch(
      `https://eos.dfuse.eosnation.io/v0/state/table/row?account=swap.defi&scope=swap.defi&table=pairs&key_type=uint64&block_num=${year_blocks_ago}&primary_key=1232&json=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((response) =>
      response.json().then((val) => {
        year_price = val.row.json.price1_last;
      })
    );
    await fetch(
      `https://eos.dfuse.eosnation.io/v0/state/table/row?account=swap.defi&scope=swap.defi&table=pairs&key_type=uint64&block_num=${six_month_blocks_ago}&primary_key=1232&json=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((response) =>
      response.json().then((val) => {
        six_month_price = val.row.json.price1_last;
      })
    );
    await fetch(
      `https://eos.dfuse.eosnation.io/v0/state/table/row?account=swap.defi&scope=swap.defi&table=pairs&key_type=uint64&block_num=${month_blocks_ago}&primary_key=1232&json=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((response) =>
      response.json().then((val) => {
        month_price = val.row.json.price1_last;
      })
    );
    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 1232,
        upper_bound: 1232,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((val) => {
        current_price = val.rows[0].price1_last;
      })
    );
    const data = [];
    data["a year"] = (100 + (current_price - year_price) * 100).toFixed(2);
    data["six months"] = (
      100 +
      (current_price - six_month_price) * 100
    ).toFixed(2);
    data["a month"] = (100 + (current_price - month_price) * 100).toFixed(2);
    setHistoricalprices(data);
  }, []);

  const refresher = () => {
    setAccountName("");
    setTimeout(() => {
      if (activeUser) {
        const accountName = activeUser.getAccountName();
        accountName.then(function (result) {
          setAccountName(result);
        });
      }
    }, 100);
  };

  const menuClick = (which) => {
    setView(which);
    setDrawerstate(false);
  };

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 588,
        upper_bound: 588,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((dadpriceeos) => setDadprice(dadpriceeos))
    );
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 12,
        upper_bound: 12,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((price) => setEosusdt(price.rows[0].price0_last))
    );
  }, [accountname]);


  //EDITIT. On alcor, new lowe and upper bound for EOSETF.
  const mainfunc = useCallback(async () => {
    const data = [];
    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "alcorammswap",
        table: "pairs",
        scope: "alcorammswap",
        lower_bound: "1232",
        upper_bound: "1232",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((result) => {
        data.defibox = result.rows[0];
      })
    );

    data.reserve0overliquidity =
      Number(data.defibox.pool1?.quantity?.split(" ")[0]) /
      data.defibox.liquidity_token;
    data.reserve1overliquidity =
      Number(data.defibox.pool2?.quantity?.split(" ")[0]) /
      data.defibox.liquidity_token;

    /**DON*T NEED 
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "lptoken.defi",
        table: "accounts",
        scope: activeUser?.accountName,
        lower_bound: "BOXAUJ",
        upper_bound: "BOXAUJ",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((result) => {
        if (result?.rows[0]?.balance) {
          data.boxaujbalance = result.rows[0];
          const inliquidity =
            (Number(data.defibox.reserve0.split(" ")[0]) /
              Number(data.defibox.liquidity_token)) *
            Number(result?.rows[0]?.balance.split(" ")[0]);
          setInliquidity(inliquidity);
        } else {
          data.boxaujbalance = { balance: "0 BOXAUJ" };
        }
      })
    );
    */

    if (activeUser !== null) {
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosio.token",
          table: "accounts",
          scope: activeUser?.accountName,
          lower_bound: "WAX",
          upper_bound: "WAX",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((result) => {
          if (result?.rows[0]?.balance) {
            data.eosbalance = result.rows[0];
          } else {
            data.eosbalance = { balance: "0.00000000 WAX" };
          }
        })
      );
    }
    else {
      data.eosbalance = { balance: "0.00000000 WAX" };
    }

    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "accounts",
        scope: activeUser?.accountName,
        lower_bound: "EOSETF",
        upper_bound: "EOSETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((result) => {
        if (result?.rows[0]?.balance) {
          data.eosetfbalance = result.rows[0];
        } else {
          data.eosetfbalance = { balance: "0.0000 EOSETF" };
        }
      })
    );

    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "accounts",
        scope: activeUser?.accountName,
        lower_bound: "CETF",
        upper_bound: "CETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((result) => {
        if (result?.rows[0]?.balance) {
          data.cetfbalance = result.rows[0];
        } else {
          data.cetfbalance = { balance: "0.0000 CETF" };
        }
      })
    );

    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: "12",
        upper_bound: "12",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((result) => {
        data.eosdefibox = result.rows[0];
      })
    );

    let boxaujsum;

    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "indstkdetf",
        scope: activeUser?.accountName,
        limit: 100,
      }),
    }).then((response) =>
      response.json().then((res) => {
        if (activeUser?.accountName) {
          data.alldeposits = res.rows;
          if (res.rows.length > 0) {
            const sum = res?.rows
              .map((o) => Number(o.staked.split(" ")[0]))
              .reduce((a, c) => {
                return a + c;
              });
            boxaujsum = sum;
          }
        }
      })
    );
    let share;
    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "totstk",
        scope: "fundfundfund",
        limit: 100,
      }),
    }).then((response) =>
      response.json().then((res) => {
        if (activeUser) {
          share =
            Number(boxaujsum) / Number(res.rows[0].totstketf.split(" ")[0]);
        }
      })
    );

    await fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "divperiod",
        scope: "fundfundfund",
        limit: 100,
      }),
    }).then((response) =>
      response.json().then((res) => {
        if (activeUser) {
          const claimperiod = res?.rows[0].claimperiod;
          
          const interval = 1200;
          const seconds_passed = 300 * claimperiod;
          const halvings = Math.floor(seconds_passed / interval).toFixed(0);
          const initial_reward = 1250000;
          const divider = Math.pow(2, halvings);
          
          const adjusted_reward = (initial_reward / divider) * share;
          if (adjusted_reward) {
            setMyshare(adjusted_reward);
          }
        }
      })
    );

    setDepositamounteosetf(
      parseFloat(depositamounteos / Number(data.defibox.price1_last)).toFixed(4)
    );
    data.eosetfpriceineos = Number(data.defibox.price1_last);
    data.eosetfpriceinusd =
      Number(data.defibox.price1_last) * Number(data.eosdefibox.price0_last);
    data.eospriceinusd = Number(data.eosdefibox.price0_last);
    data.eosetfinusd =
      Number(data.defibox.price1_last) *
      Number(data.eosdefibox.price0_last) *
      Number(data?.eosetfbalance?.balance.split(" ")[0]);
    data.eosinusd =
      Number(data.eosdefibox.price0_last) *
      Number(data?.eosbalance?.balance.split(" ")[0]);
    let withdrawamounts = [];
    data?.alldeposits?.forEach((value, index) => {
      withdrawamounts.push({ index: index, withdrawamount: 0 });
    });
    setWithdrawamounts(withdrawamounts);
    setPortfoliodata(data);

  }, [activeUser])

  useEffect(() => {
    mainfunc()
  }, [mainfunc]);

  const withdrawhandler = (index, amount) => {
    let withdraw = withdrawamounts;
    withdraw[index].withdrawamount = amount;
    setWithdrawamounts(withdraw);
  };

  const withdraw = async (index) => {
    const finalamount = Math.floor(
      (Number(withdrawamounts[index].withdrawamount) / 100) *
      Number(portfoliodata.alldeposits[index].staked.split(" ")[0])
    );
    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "unstakeetf",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                user: displayaccountname(),
                quantity: [`${finalamount} BOXAUJ`],
                id: [index],
                clmspecifier: "cetfcetfcetf",
              },
            },
          ],
        };
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success(`${finalamount} ETF unstaked!`);
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 3000);
      } catch (e) {
        swal_error(e);
      }
    }
  };

  const selltokens = async () => {
    const reserve0 = Number(eosetfprice?.rows[0]?.pool1?.quantity.split(" ")[0]);
    const reserve1 = Number(eosetfprice?.rows[0]?.pool2?.quantity.split(" ")[0]);
    const slippage =
      reserve0 / reserve1 / (reserve0 / (reserve1 + Number(selltokenamount)));
    if ((slippage - 1) * 100 > 3) {
      swal_error(
        "Slippage is higher than 3%. (" +
        ((slippage - 1) * 100).toFixed(2) +
        "%)"
      );
      return;
    }
    /**slippage = reserve0/reserve1/(reserve0/(reserve1+multparse))

multparse = parseFloat((mult * tokenamount)).toFixed(nr)

mult = Number(value.minamount.split(" ")[0])**/

    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(),
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "swap.defi",
                quantity: parseFloat(selltokenamount).toFixed(4) + " EOSETF",
                memo: "swap,0,1232",
              },
            },
          ],
        };
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success(`${selltokenamount} EOSETF sold!`);
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 3000);
      } catch (e) {
        swal_error(e);
      }
    }
  };

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 1232,
        upper_bound: 1232,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfprice) => setEosetfprice(eosetfprice))
    );
  }, [accountname]);

  const getdadprice = () => {
    if (dadpriceeos.rows[0]) {
      return Number(dadpriceeos.rows[0].price1_last);
    } else {
      return 0;
    }
  };

  const geteosetfprice = () => {
    if (eosetfprice.rows[0]) {
      return Number(eosetfprice.rows[0].price1_last);
    } else {
      return 0;
    }
  };

  const getpricesum = () => {
    if (prices) {
      return (
        getprice("box") * boxmult +
        getprice("ogx") * ogxmult +
        getprice("iq") * iqmult +
        getprice("dapp") * dappmult +
        getprice("vig") * vigmult +
        getprice("efx") * efxmult +
        getprice("chex") * chexmult +
        getprice("pizza") * pizzamult +
        getprice("dfs") * dfsmult +
        getprice("emt") * emtmult +
        getprice("dex") * dexmult +
        getprice("tpt") * tptmult +
        getdadprice() * dadmult
      );
    }
  };

  useEffect(() => {
    const newdexcomms = [
      { community: "box", symbol: "token.defi-box-eos" },
      { community: "ogx", symbol: "core.ogx-ogx-eos" },
      { community: "iq", symbol: "everipediaiq-iq-eos" },
      { community: "dapp", symbol: "dappservices-dapp-eos" },
      { community: "vig", symbol: "vig111111111-vig-eos" },
      { community: "efx", symbol: "effecttokens-efx-eos" },
      { community: "chex", symbol: "chexchexchex-chex-eos" },
      { community: "pizza", symbol: "pizzatotoken-pizza-eos" },
      { community: "dfs", symbol: "minedfstoken-dfs-eos" },
      { community: "emt", symbol: "emanateoneos-emt-eos" },
      { community: "dex", symbol: "token.newdex-dex-eos" },
      { community: "tpt", symbol: "eosiotptoken-tpt-eos" },
    ];
    newdexcomms.forEach((item) => {
      fetch("https://api.newdex.io/v1/price?symbol=" + item.symbol)
        .then((response) => response.json())
        .then((data) => {
          Object.assign(item, { price: data?.data?.price });
          setPrices([...newdexcomms]);
        });
    });
  }, []);

  const getprice = (community) => {
    if (prices) {
      const datar = prices.filter(function (data) {
        return data.community == community;
      });
      if (datar[0]) return datar[0].price;
    }
  };
  /* NO NEED
  const senddeposit = async () => {
    if (activeUser) {
      const boxaujtransfer = Math.floor(
        (Number(portfoliodata?.defibox?.liquidity_token) /
          Number(portfoliodata?.defibox?.reserve0?.split(" ")[0])) *
        depositamounteos * 0.9997
      );
      try {
        const transaction = {
          actions: [
            {
              account: "eosio.token",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(),
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "swap.defi",
                quantity: parseFloat(depositamounteos).toFixed(8) + " WAX",
                memo: "deposit,1232",
              },
            },
            {
              account: "fundfundfund",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(),
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "swap.defi",
                quantity:
                  parseFloat(depositamounteosetf).toFixed(4) + " EOSETF",
                memo: "deposit,1232",
              },
            },
            {
              account: "swap.defi",
              name: "deposit",
              authorization: [
                {
                  actor: displayaccountname(),
                  permission: "active",
                },
              ],
              data: {
                owner: displayaccountname(),
                pair_id: 1232,
              },
            },
            {
              account: "lptoken.defi",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(),
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "fundfundfund",
                quantity: boxaujtransfer + " BOXAUJ",
                memo: "deposit,1232",
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success("Successfully deposited!");
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 5000);
      } catch (e) {
        swal_error(e);
      }
    }
  };
  */
  const deposit = (value, currency) => {

    let input = value;
    if (input.length == 0) {
      setDepositamounteos("");
      setDepositamounteosetf("")
    }
    if (
      /^[0-9.]+$/.test(input) && input.split(".").length - 1 < 2 && input.length > 0 && (input?.toString().split(".")[1]?.length < 5 || typeof (input.toString().split(".")[1]) == "undefined")
    ) {
      if (currency == "EOS") {
        setDepositamounteos(input);
        setDepositamounteosetf(
          parseFloat(input / portfoliodata?.eosetfpriceineos).toFixed(4)
        ); //SIIA HINNAGA KORRUTIS
      } else {
        setDepositamounteos(
          parseFloat(input * portfoliodata?.eosetfpriceineos).toFixed(4)
        );
        setDepositamounteosetf(input);
      }
    }

  };


  const labelarray = (data) => {
    const arr = [];
    data?.forEach((i) => {
      arr.push(i?.token?.split(",")[1]);
    });
    return arr;
  };

  useEffect(() => {
    if (fulldata) {
      const datar = fulldata;
      datar.forEach((element, index, array) => {
        fetch(`${endpoint}/v1/chain/get_table_rows`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            json: true,
            code: "swap.defi",
            table: "pairs",
            scope: "swap.defi",
            lower_bound: datar[index].pairid,
            upper_bound: datar[index].pairid,
            limit: 1,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data?.rows[0]?.reserve0.split(" ")[1] == "EOS") {
              datar[index].price = Number(data?.rows[0].price1_last);
            } else {
              datar[index].price = Number(data?.rows[0]?.price0_last);
            }
          })
          .then(() => {
            const arr = [];
            const eosetfpricearray = [];
            const pricesum = datar
              .map((p) => p.price * Number(p.minamount.split(" ")[0]))
              .reduce((a, b) => a + b);
            datar.forEach((i) => {
              //make result here (price * multiplier)/price_sum
              const result = (
                (Number(i.price) * Number(i.minamount.split(" ")[0]) * 100) /
                pricesum
              ).toFixed(2);
              arr.push(result);
            });
            setChartPrices(arr);
            setEtfprice(pricesum);
          })
          .then(() => {
            const prices = [];
            datar.map((value, index) => {
              prices.push(value?.price);
            });
            const pricesum = prices.reduce((a, b) => a + b, 0);
          });
      });
    }
  }, [fulldata]);

  const data1 = {
    labels: labelarray(fulldata),
    datasets: [
      {
        label: "ETF weight",
        fill: true,
        lineTension: 0.1,
        backgroundColor: [
          "#f17ae9",
          "#f9a9f1",
          "#fdd5f8",
          "#ffffff",
          "#7aa6e3",
          "#8fe1ff",
          "#21d2ff",
          "#f9a9f1",
          "#fdd5f8",
          "#fffff5",
          "#cbf0ff",
          "#fbaaeb",
          "#21d2f8",
        ],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        data: chartprices,
      },
    ],
  };

  //price1_last
  const getbalance = (row) => {
    if (row.balance) {
      return Number(row?.balance.split(" ")[0]);
    }
  };

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "rebalon",
        scope: "fundfundfund",
        limit: 100,
      }),
    }).then((response) => response.json().then((res) => fetcher(res)));
    //fetch main table
    //for each row in main table, fetch more => append to items in main state
    //outside of this function, start replacing hardcoded state with dynamic
    const fetcher = (fetchdata) => {
      setFulldata(fetchdata.rows);
      if (fetchdata.rows) {
        let data = fetchdata.rows;
        data.forEach((element, index, array) => {
          if (accountname) {
            fetch(`${endpoint}/v1/chain/get_table_rows`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                json: true,
                code: element.contract,
                table: "accounts",
                scope: displayaccountname(),
                limit: 1,
              }),
            })
              .then(function (response) {
                if (response.ok) {
                  return response;
                }
                data[index].balance =
                  "0.0000 " + data[index].minamount.split(" ")[1];
              })
              .then((response) =>
                response?.json().then((balance) => {
                  if (balance?.rows?.length !== 0) {
                    attachbalance(balance?.rows[0]?.balance);
                  } else {
                    data[index].balance =
                      "0.0000 " + data[index].minamount.split(" ")[1];
                  }
                })
              );
          }
          //FETCH HERE
          //THEN data[index].newvalue = fetched_value
          const attachbalance = (balance) => {
            data[index].balance = balance;
          };
        });
        setFulldata(data);

        //TODO RIGHT NOW FOR PRICE SUM. NEED TO ADD MULTIPLIERS.
      }
    };
  }, [accountname]);

  useEffect(async () => {
    if (accountname) {
      let dividenddata = {};

      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "accounts",
          scope: displayaccountname(),
          lower_bound: "EOSETF",
          upper_bound: "EOSETF",
          limit: 1,
        }),
      }).then((response) =>
        response
          .json()
          .then((eosetfbalanceind) => setEosetfind(eosetfbalanceind))
      );
      let userstake;
      let feetouser;

      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
          upper_bound: "CETF",
          lower_bound: "CETF",
        }),
      }).then((response) =>
        response.json().then((etfbalanceind) => {
          setEtfind(etfbalanceind);

          fetch(`${endpoint}/v1/chain/get_table_rows`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              json: true,
              code: "fundfundfund",
              table: "persznstaked",
              scope: displayaccountname(),
              limit: 100,
            }),
          }).then((response) =>
            response.json().then((res) => {
              const stakedamount = Number(
                etfbalanceind?.rows[0]?.balance.split(" ")[0]
              );
              if (stakedamount) {
                setStakemax(stakedamount);
                setStake(stakedamount);
              }
              if (res.rows[0]) {
                dividenddata["stakedata"] = res.rows;
                const sum = res.rows
                  .map((o) => Number(o.staked.split(" ")[0]))
                  .reduce((a, c) => {
                    return a + c;
                  });
                const stakedamount =
                  Number(etfbalanceind.rows[0].balance.split(" ")[0]) - sum;
                setStakemax(stakedamount);
                setStake(stakedamount);

                setStaketable(res);
                userstake = stakedamount;
              }
            })
          );
        })
      );

      //DIV PERIODSTART AND TOTAL CLAIM PERIOD
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "divperiod",
          scope: "fundfundfund",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          dividenddata["periodstart"] = res.rows[0].periodstart;
          dividenddata["totalclaimperiod"] = res.rows[0].claimperiod;
        })
      );

      //PERIOD FREQUENCY
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "clmperfreq",
          scope: "fundfundfund",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          dividenddata["periodfreq"] = res.rows[0].periodfreq;
        })
      );

      //TOTAL STAKED
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "totstk",
          scope: "fundfundfund",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          dividenddata["totalstaked"] = res?.rows[0]?.totalstaked;
          feetouser =
            userstake / Number(res?.rows[0]?.totalstaked.split(" ")[0]);
        })
      );

      //ETF FEES
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "etffees",
          scope: "fundfundfund",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          dividenddata["totalfees"] = res.rows[0].totalfees;
        })
      );

      //FEES ADJUST
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "feesadjust",
          scope: "fundfundfund",
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          dividenddata["adjustcrtclm"] = res.rows[0].adjustcrtclm;
        })
      );

      //CLAIM TIME EOSETF
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "claimtime",
          scope: "eosetfeosetf",
          lower_bound: displayaccountname(),
          upper_bound: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          if (res?.rows[0]?.claimperiod) {
            dividenddata["userclaimperiod"] = res.rows[0].claimperiod;
          } else {
            dividenddata["userclaimperiod"] = false;
          }
        })
      );

      //CLAIMTIME CETF
      await fetch(`${endpoint}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "fundfundfund",
          table: "claimtime",
          scope: "cetfcetfcetf",
          lower_bound: displayaccountname(),
          upper_bound: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((res) => {
          if (res?.rows[0]?.claimperiod) {
            dividenddata["userclaimperiodcetf"] = res.rows[0].claimperiod;
          } else {
            dividenddata["userclaimperiodcetf"] = false;
          }
        })
      );

      /** 
      if 
        {
        (staketime + periodfreq)  < current time
        }

    {
        "totalstaked": "132.0000 CETF",
        "totalfees": "0.0166 EOSETF",
        "userclaimperiod": false,
        "periodfreq": 300,
        "adjustcrtclm": "0.0000 EOSETF",
        "periodstart": "2021-12-04T15:53:39",
        "totalclaimperiod": 17,
        "staked": "30.0000 CETF",
        "staketime": "2021-12-04T13:23:00"
    }
    **/
      const now = new Date(
        Date.now() + new Date().getTimezoneOffset() * 60000
      ).getTime();

      const timetilnextperiod =
        Date.parse(dividenddata.periodstart) +
        dividenddata.periodfreq * 1000 -
        now;
      if (timetilnextperiod / 1000 > 86400) {
        setDisplaytime(
          (timetilnextperiod / 1000 / 60 / 60 / 24).toFixed(0) + " days"
        );
      }
      if (timetilnextperiod / 1000 < 86400) {
        setDisplaytime((timetilnextperiod / 1000 / 60 / 60).toFixed(0) + " h");
      }
      if (timetilnextperiod / 1000 < 3600) {
        setDisplaytime((timetilnextperiod / 1000 / 60).toFixed(0) + " min");
      }
      if (timetilnextperiod / 1000 < 0) {
        setDisplaytime("Claim");
      }

      if (timetilnextperiod - Number(dividenddata.periodfreq) > 0) {
        setTimetilnext(
          100 -
          (100 * (timetilnextperiod / 1000)) / Number(dividenddata.periodfreq)
        );
      } else {
        setTimetilnext(100);
      }
      if (dividenddata.stakedata && accountname) {
        dividenddata.stakedata.map((row, index) => {
          if (
            Date.parse(row.staketime) + dividenddata.periodfreq * 1000 >
            now
          ) {
            //keep it. else dump it from stakes as it doesn't count.
            dividenddata.stakedata[index].flag = true;
          } else {
            dividenddata.stakedata[index].flag = false;
          }
        });

        //How much user gets
        let substract = 0;
        dividenddata.stakedata.forEach((row) => {
          if (
            Date.parse(row.staketime) + dividenddata.periodfreq * 1000 >
            now
          ) {
            substract += Number(row.staked.split(" ")[0]);
          }
        });
        const percgets =
          dividenddata.stakedata
            .filter((x) => x.flag == false)
            .reduce((a, b) => a + Number(b.staked.split(" ")[0]), 0) /
          (Number(dividenddata.totalstaked.split(" ")[0]) - substract);

        // Lenny trust me, cetf and eosetf periods don't go out of sync.
        //kaks varianti. if not equal to period, if equal to period.
        let dividend;
        if (
          Date.parse(dividenddata.periodstart) +
          dividenddata.periodfreq * 1000 <
          now
        ) {
          //kui periood on läbi, siis arvuta dividend nii
          dividend =
            percgets *
            (Number(dividenddata.totalfees.split(" ")[0]) +
              Number(dividenddata.adjustcrtclm.split(" ")[0]));
        } else {
          //kui periood käib, siis arvuta dividend nii
          dividend = percgets * Number(dividenddata.totalfees.split(" ")[0]);
        }
        setDividendclaim(dividend);
        if (dividenddata.userclaimperiod == dividenddata.totalclaimperiod) {
          setDividendclaim(dividend);
          setDividendflag(true);
        } else {
          setDividendclaim(dividend);
          setDividendflag(false);
        }

        //CETF FLAG
        if (dividenddata.userclaimperiod == dividenddata.totalclaimperiod) {
          setDividendflagcetf(true);
        } else {
          setDividendflagcetf(false);
        }
      } else {
        setDividendclaim(0);
      }
    }
  }, [accountname, refresh]);

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "accounts",
        scope: displayaccountname(),
        lower_bound: "CETF",
        upper_bound: "CETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((etfbalanceind) => setEtfind(etfbalanceind))
    );
  }, [accountname]);

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "stat",
        scope: "CETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((etfbalance) => setEtf(etfbalance))
    );
  }, [accountname]);

  useEffect(() => {
    fetch(`${endpoint}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "fundfundfund",
        table: "stat",
        scope: "EOSETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfbalance) => setEosetf(eosetfbalance))
    );
  }, [accountname]);

  const gettokenbalance = (token) => {
    if (token.rows[0]) {
      return Number(token.rows[0].balance.split(" ")[0]);
    } else {
      return 0;
    }
  };

  const gettokenbalanceone = (token) => {
    if (token.rows[0]) {
      return Math.floor(Number(token.rows[0].balance.split(" ")[0]));
      //return (token.rows[0].balance);
    } else {
      return 0;
    }
  };

  const gettokenbalancetwo = (token) => {
    if (token.rows[1]) {
      return Math.floor(Number(token.rows[1].balance.split(" ")[0]));
    } else {
      return 0;
    }
  };

  const gettokensupply = (token) => {
    if (token.rows[0]) {
      return Math.floor(Number(token.rows[0].supply.split(" ")[0]));
    } else {
      return 0;
    }
  };

  const halvingdivider = () => {
    if (etfbalance.rows[0]) {
      return parseInt(
        Math.pow(
          2,
          parseInt(
            Math.floor(Number(etfbalance.rows[0].supply.split(" ")[0])) /
            20000000
          )
        )
      );
    }
  };

  const creationreward = () => {
    return parseInt(80 / halvingdivider());
  };

  const halvings = (totalcirc) => {
    if (totalcirc < 20000000) {
      return 0;
    } else if (totalcirc >> 20000000 && totalcirc < 40000000) {
      return 1;
    } else if (totalcirc >> 40000000 && totalcirc < 60000000) {
      return 2;
    } else if (totalcirc >> 60000000 && totalcirc < 80000000) {
      return 3;
    }
  };

  const dynamicsend = (buy) => {
    const fulldatacopy = fulldata.filter((item) => item.ratio > 0);
    let alldata = [];
    /**if (fulldatacopy) {
      Promise.all(
        fulldatacopy.map((value, index) => {
          return new Promise((resolve) => {
            fetch(`${endpoint}/v1/chain/get_table_rows`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                json: true,
                code: "swap.defi",
                table: "pairs",
                scope: "swap.defi",
                lower_bound: fulldatacopy[index].pairid,
                upper_bound: fulldatacopy[index].pairid,
                limit: 1,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                fulldatacopy[index].defibox = data;
              })
              .then(() => {
                fulldatacopy.forEach((element, index, array) => {
                  if (accountname) {
                    fetch(`${endpoint}/v1/chain/get_table_rows`, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        json: true,
                        code: element.contract,
                        table: "accounts",
                        scope: displayaccountname(),
                        limit: 1,
                      }),
                    })
                      .then(function (response) {
                        if (response.ok) {
                          return response;
                        }
                        attachbalance(
                          "0.0000 " +
                          fulldatacopy[index].minamount.split(" ")[1]
                        );
                      })
                      .then((response) =>
                        response?.json().then((balance) => {
                          if (balance?.rows?.length !== 0) {
                            attachbalance(balance?.rows[0]?.balance);
                          } else {
                            attachbalance(
                              "0.0000 " +
                              fulldatacopy[index].minamount.split(" ")[1]
                            );
                          }
                        })
                      );
                  }
                  //FETCH HERE
                  //THEN data[index].newvalue = fetched_value
                  const attachbalance = (balance) => {
                    fulldatacopy[index].balance = balance;
                  };
                  resolve();
                });
              });
          });
        })
      ).then(() => {
        sender(fulldatacopy, buy);
      });
    }
    */
    if (fulldatacopy) {
      Promise.all(
        fulldatacopy.map((value, index) => {
          return new Promise((resolve) => {
            fetch(`${endpoint}/v1/chain/get_table_rows`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                json: true,
                code: "swap.defi",
                table: "pairs",
                scope: "swap.defi",
                lower_bound: fulldatacopy[index].pairid,
                upper_bound: fulldatacopy[index].pairid,
                limit: 1,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                fulldatacopy[index].defibox = data;
              })
              .then(() => {
                fulldatacopy.forEach((element, index, array) => {
                  if (accountname) {
                    fetch(`${endpoint}/v1/chain/get_table_rows`, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        json: true,
                        code: element.contract,
                        table: "accounts",
                        scope: displayaccountname(),
                        limit: 1,
                      }),
                    })
                      .then(function (response) {
                        if (response.ok) {
                          return response;
                        }
                        attachbalance(
                          "0.0000 " +
                          fulldatacopy[index].minamount.split(" ")[1]
                        );
                      })
                      .then((response) =>
                        response?.json().then((balance) => {
                          if (balance?.rows?.length !== 0) {
                            attachbalance(balance?.rows[0]?.balance);
                          } else {
                            attachbalance(
                              "0.0000 " +
                              fulldatacopy[index].minamount.split(" ")[1]
                            );
                          }
                        })
                      );
                  }
                  //FETCH HERE
                  //THEN data[index].newvalue = fetched_value
                  const attachbalance = (balance) => {
                    fulldatacopy[index].balance = balance;
                  };
                  resolve();
                });
              });
          });
        })
      ).then(() => {
        sender(fulldatacopy, buy);
      });
    }

    const sender = async (totaldata, buyornot) => {
      let tokenamount = tokens;
      let slippagetoohigh = false;
      let slippagelist = [];
      const multparse = (mult, nr, bal) => {
        if (bal) {
          if (buyornot == true) {
            return (
              Number(parseFloat(mult * tokenamount).toFixed(nr)) -
              parseFloat(bal?.split(" ")[0])
            );
          } else {
            return Number(parseFloat(mult * tokenamount).toFixed(nr));
          }
        }
      };
      const reserveparse = (token, reserve) => {
        return Number(parseFloat(token?.rows[0][reserve]));
      };
      const slippageparseflip = (token, mult, nr, balance) => {
        const slippage =
          reserveparse(token, "reserve1") /
          reserveparse(token, "reserve0") /
          (reserveparse(token, "reserve1") /
            (reserveparse(token, "reserve0") + multparse(mult, nr, balance)));
        if ((slippage - 1) * 100 > 3) {
          slippagelist.push({
            token: token?.rows[0].reserve0.split(" ")[1],
            amount: ((slippage - 1) * 100).toFixed(2),
          });
          slippagetoohigh = true;
        }
        return slippage;
      };
      const slippageparse = (token, mult, nr, balance) => {
        const slippage =
          reserveparse(token, "reserve0") /
          reserveparse(token, "reserve1") /
          (reserveparse(token, "reserve0") /
            (reserveparse(token, "reserve1") + multparse(mult, nr, balance)));
        if ((slippage - 1) * 100 > 3) {
          slippagelist.push({
            token: token?.rows[0].reserve1.split(" ")[1],
            amount: ((slippage - 1) * 100).toFixed(2),
          });
          slippagetoohigh = true;
        }
        return slippage;
      };
      totaldata.map((value, index) => {
        let buyamount;
        if (value.defibox.rows[0].reserve0.split(" ")[1] == "EOS") {
          buyamount = (
            (reserveparse(value.defibox, "reserve0") /
              reserveparse(value.defibox, "reserve1")) *
            1.003 *
            multparse(
              Number(value.minamount.split(" ")[0]),
              value.token.split(",")[0],
              value.balance
            ) *
            slippageparse(
              value.defibox,
              Number(value.minamount.split(" ")[0]),
              value.token.split(",")[0],
              value.balance
            ) +
            0.004
          ).toFixed(4);
        } else {
          buyamount = (
            (reserveparse(value.defibox, "reserve1") /
              reserveparse(value.defibox, "reserve0")) *
            1.003 *
            multparse(
              Number(value.minamount.split(" ")[0]),
              value.token.split(",")[0],
              value.balance
            ) *
            slippageparseflip(
              value.defibox,
              Number(value.minamount.split(" ")[0]),
              value.token.split(",")[0],
              value.balance
            ) +
            0.004
          ).toFixed(4);
        }
        totaldata[index].buyamount = buyamount;
      });

      if (activeUser) {
        try {
          const transaction = {
            actions: [],
          };
          totaldata.map((value, index) => {
            transaction.actions.push({
              account: value.contract,
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "fundfundfund",
                //quantity: 19.2562 * tokens + " DAPP",
                memo: "EOSETF creation through eosetf.io",
                quantity:
                  parseFloat(
                    value.minamount.split(" ")[0] * tokenamount
                  ).toFixed(value.token.split(",")[0]) +
                  " " +
                  value.token.split(",")[1],
              },
            });
          });

          totaldata.map((value, index) => {
            if (
              multparse(
                value.minamount.split(" ")[0],
                value.token.split(",")[0],
                value.balance
              ) > 0
            ) {
              transaction.actions.unshift({
                account: "eosio.token",
                name: "transfer",
                authorization: [
                  {
                    actor: displayaccountname(), // use account that was logged in
                    permission: "active",
                  },
                ],
                data: {
                  from: displayaccountname(),
                  to: "swap.defi",
                  //quantity: 19.2562 * tokens + ' DAPP',
                  memo: "swap,0," + value.strpairid,
                  quantity: value.buyamount + " WAX",
                },
              });
            }
          });
          let nanerror = false;
          totaldata.map((value, index) =>{
            if(isNaN(value.buyamount)){
              nanerror = true
            }
          })
          // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
          if(nanerror == false){
          if (buyornot == true && slippagetoohigh == false) {
            await activeUser.signTransaction(transaction, {
              broadcast: true,
              expireSeconds: 300,
            });
            sucessstake();
          } else if (buyornot == false && slippagetoohigh == false) {
            await activeUser.signTransaction(transaction, {
              broadcast: true,
              expireSeconds: 300,
            });
            sucessstake();
          } else {
            var slippagemessage = "";
            if (Object.keys(slippagelist).length > 1) {
              slippagelist.forEach((item) => {
                slippagemessage = slippagemessage.concat(
                  item.token,
                  "(",
                  item.amount,
                  "%), "
                );
              });
            } else {
              slippagemessage = slippagemessage.concat(
                slippagelist[0].token,
                "(",
                slippagelist[0].amount,
                "%), "
              );
            }

            const message =
              "Slippage was higher than 3% for: " +
              slippagemessage.slice(0, -2) +
              ".";

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          }
          }
          else{
            swal_error("Something went wrong, please try again.");
          }
        } catch (error) {
          actionpuccis(error.message);
        }
      } else {
        showModal();
      }
    };
  };

  const unstake = async (index) => {
    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "unstakecetf",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                user: displayaccountname(),
                quantity: [staketable.rows[index].staked],
                id: [staketable.rows[index].id],
                clmspecifier: "eosetfeosetf",
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success("Successfully unstaked!");
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 3000);
      } catch (e) {
        swal_error(e);
      }
    }
  };

  const getdiv = async () => {
    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "getdiv",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                user: displayaccountname(),
                clmspecifier: "eosetfeosetf",
              },
            },
            {
              account: "fundfundfund",
              name: "getcetf",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                user: displayaccountname(),
                clmspecifier: "cetfcetfcetf",
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success("Dividends claimed!");
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 3000);
      } catch (e) {
        swal_error(e);
      }
    }
  };

  const stakeetf = async () => {
    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "stakecetf",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                user: displayaccountname(),
                quantity: stake.toFixed(4) + " CETF",
                id: Math.floor(Math.random() * 1000000000),
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        swal_success("Successfully staked " + stake.toFixed(4) + " CETF!");
        setTimeout(() => {
          setRefresh(refresh + 1);
        }, 2000);
      } catch (e) {
        swal_error(e);
      }
    }
  };

  const sendetf = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    var eosetf = Number(redeemtokens).toFixed(4);

    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "fundfundfund",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "fundfundfund",
                quantity: Number(selltokenamount).toFixed(4) + " EOSETF",
                memo: "EOSETF redemption through eosetf.io",
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });

        sucessredemption();
      } catch (error) {
        actionpuccis(error.message);
      }
    } else {
      showModal();
    }
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerstate(open);
  };

  return (
    <div className="App">
      <EndpointSetter endpoint={endpoint} show22={show22} handleClose22={() => handleClose22()} />
      <header className="App-header">
        <div
          class="outsidebutton githubbutton"
          onClick={() =>
            window.open("https://github.com/n0umen0n/cetfphase2", "_blank")
          }
        >
          <img class="outsideimgright" src="assets/github.png" />
          <div class="outsidebuttontext">GIT</div>
        </div>
        <div
          class="outsidebutton telegrambutton"
          onClick={() => window.open("https://t.me/eosetf", "_blank")}
        >
          <img class="outsideimgright" src="assets/telegram.webp" />
          <div class="outsidebuttontext">TG</div>
        </div>
        <div
          class="outsidebutton twitterbutton"
          onClick={() => window.open("https://twitter.com/CETF13", "_blank")}
        >
          <img class="outsideimgright" src="assets/twitter.png" />
          <div class="outsidebuttontext">TWIT</div>
        </div>
        <div
          class="outsidebutton mediumbutton"
          onClick={() => window.open("https://medium.com/@eosetf", "_blank")}
        >
          <img class="outsideimgright" src="assets/med.png" />
          <div class="outsidebuttontext">MED</div>
        </div>

        <div class="maincard">
          <div
            class="outsidebutton govrnbutton"
            onClick={() =>
              window.open(
                "https://app.consortium.vote/community/zlmdhu2blclw",
                "_blank"
              )
            }
          >
            <img class="outsideimg" src="assets/consologo.png" />
            <div class="outsidebuttontext">VOTE</div>
          </div>
          <div
            class="outsidebutton buybutton"
            onClick={() =>
              window.open(
                "https://defibox.io/pool-market-details/1232",
                "_blank"
              )
            }
          >
            <img class="outsideimg" src="assets/buylogo.png" />
            <div class="outsidebuttontext">BUY/SELL</div>
          </div>
          <Drawer
            anchor="right"
            open={drawerstate}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            opacity="0.5"
          >
            <div class="sidemenu">
              <div class="mobilemenu">
                <div class="logo">
                  <img width="64px" src="assets/logo.svg" />
                </div>
                <div class="appname">
                  <a>CETF</a>
                </div>
                <div class="accountname">
                  {accountname == "" ? <a>not logged in</a> : accountname}
                </div>
                <div class="menuitemswrapper">
                  <table class="menuitems">
                    <tr onClick={() => menuClick("about")}>
                      <td>
                        <img
                          class="menuimg"
                          src="assets/iconmonstr-chart-11.svg"
                        />
                      </td>
                      <td>
                        <a class="menuitemtext">Tokens</a>
                      </td>
                    </tr>

                    <tr onClick={() => menuClick("stats")}>
                      <td>
                        <img class="menuimg" src="assets/stats.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Tokenomics</a>
                      </td>
                    </tr>

                    <tr
                      onClick={() =>
                        window.open(
                          "https://app.consortium.vote/community/zlmdhu2blclw",
                          "_blank"
                        )
                      }
                    >
                      <td>
                        <img class="menuimg" src="assets/govern.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Vote</a>
                      </td>
                    </tr>
                    <tr
                      onClick={() =>
                        (window.location = "https://polling.eosetf.io")
                      }
                    >
                      <td>
                        <img class="menuimg" src="assets/briefcase.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Rebalance</a>
                      </td>
                    </tr>

                    <tr
                      onClick={() =>
                        window.open(
                          "https://defibox.io/pool-market-details/1232",
                          "_blank"
                        )
                      }
                    >
                      <td>
                        <img class="menuimg" src="assets/checkout.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Defibox</a>
                      </td>
                    </tr>
                    <tr
                      onClick={() =>
                        window.open("https://t.me/eosetf", "_blank")
                      }
                    >
                      <td>
                        <img class="menuimg" src="assets/telegram.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Telegram</a>
                      </td>
                    </tr>
                    <tr
                      onClick={() =>
                        window.open(
                          "https://github.com/n0umen0n/sceosetf",
                          "_blank"
                        )
                      }
                    >
                      <td>
                        <img class="menuimg" src="assets/github.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Github</a>
                      </td>
                    </tr>
                    {accountname == "" ? (
                      <tr onClick={() => logmein()}>
                        <td>
                          <img class="menuimg" src="assets/login.svg" />
                        </td>
                        <td>
                          <a class="menuitemtext">Login</a>
                        </td>
                      </tr>
                    ) : (
                        <tr onClick={() => logmeout()}>
                          <td>
                            <img class="menuimg" src="assets/logout.svg" />
                          </td>
                          <td>
                            <a class="menuitemtext">Logout</a>
                          </td>
                        </tr>
                      )}
                  </table>
                </div>
              </div>
            </div>
          </Drawer>
          <div class="leftbar">
            <div class="logo">
              <img width="64px" src="assets/logo.svg" />
            </div>
            <div class="appname">
              <a>CETF</a>
            </div>
            <div class="accountname">
              {accountname == "" ? <a>Not logged in</a> : accountname}
            </div>
            <div class="menuitemswrapper">
              <table class="menuitems">
                <tr onClick={() => setView("create")}>
                  <td>
                    <img
                      class="menuimg"
                      src="assets/iconmonstr-bitcoin-6.svg"
                    />
                  </td>
                  <td>
                    <a class="menuitemtext">Invest</a>
                  </td>
                </tr>
                <tr onClick={() => setView("staking")}>
                  <td>
                    <img class="menuimg" src="assets/stake.svg" />
                  </td>
                  <td>
                    <a class="menuitemtext">Stake</a>
                  </td>
                </tr>
                <tr onClick={() => handleShow22()}>
                  <td>
                    <img class="menuimg" src="assets/iconmonstr-chart-5.svg" />
                  </td>
                  <td>
                    <a class="menuitemtext">Set endpoint</a>
                  </td>
                </tr>
                <tr onClick={() => setView("portfolio")}>
                  <td>
                    <img class="menuimg" src="assets/briefcase.svg" />
                  </td>
                  <td>
                    <a class="menuitemtext">My Portfolio</a>
                  </td>
                </tr>
                <tr onClick={() => setView("about")}>
                  <td>
                    <img class="menuimg" src="assets/iconmonstr-chart-11.svg" />
                  </td>
                  <td>
                    <a class="menuitemtext">Tokens</a>
                  </td>
                </tr>
                <tr onClick={() => setView("stats")}>
                  <td>
                    <img class="menuimg" src="assets/stats.svg" />
                  </td>
                  <td>
                    <a class="menuitemtext">Tokenomics</a>
                  </td>
                </tr>

                {accountname == "" ? (
                  <tr onClick={() => showModal()}>
                    <td>
                      <img class="menuimg" src="assets/login.svg" />
                    </td>
                    <td>
                      <a class="menuitemtext">Login</a>
                    </td>
                  </tr>
                ) : (
                    <tr onClick={() => logmeout()}>
                      <td>
                        <img class="menuimg" src="assets/logout.svg" />
                      </td>
                      <td>
                        <a class="menuitemtext">Logout</a>
                      </td>
                    </tr>
                  )}
              </table>
            </div>
          </div>
          {view == "create" ? (
            <Scrollbars
              class="mask"
              style={{ width: "100%", height: "100%" }}
              autoHide
            >
              <div class="rightbar">
                <div class="rightbartopbox">
                  <div class="createetftitle">
                    <div>
                      <a>Invest</a>
                    </div>
                    <div className={classes.root}>
                      <Accordion className={classes.expansion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={classes.summary}
                        >
                          <Typography className={classes.heading}>
                            Click here for more information
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.expansion2}>
                          <Typography
                            className={classes.heading}
                            style={{
                              "padding-right": "10px",
                              "padding-bottom": "1px",
                            }}
                          >
                            NB! CETF is a new protocol, there might be exploits
                            in the code that will cause loss of all your funds.
                            <br />
                            <br />
                            By investing you are buying tokens on EOS mainnet
                            and creating EOSETF. <br />
                            <br />
                            EOSETF is a token. The price of EOSETF fully depends on how the tokens in the fund perform.
                            <br />
                            <br />
                            EOSETF is actively managed by fund managers who
                            pick tokens to be included in the fund.
                            <br />
                            <br />
                            There is 5% fee that is charged once when you create EOSETF or buy it via Defibox.
                            <br />
                            <br />
                            Anytime, EOSETF can be redeemed to receive the
                            EOS tokens you bought. EOSETF can also be sold on
                            Defibox.
                            <br />
                            <br />

                            Tokens in the fund are under msig between five Eden
                            members.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                  {/**<div class="slidertext">
                    <a>Creating <input style={{ "color": tokens > 200 ? "red" : "inherit" }} class="tokeninput" type="number" value={tokens} onChange={e => setTokens(e.target.value)}></input> EOSETF, consisting of tokens valued at <input class="eosvalue" type="number" value={parseFloat(tokens * etfprice).toFixed(2)}></input> EOS </a>
                  </div>
                  <div class="slider">
                    <CustomSlider
                      defaultValue={0.0000}
                      value={tokens}
                      aria-label="custom thumb label"
                      step={1.0000}
                      min={0}
                      max={200.0000}
                      onChangeCommitted={(e, val) => setTokens(val)}
                      style={{
                        marginBottom: "10px",
                        "margin-top": "10px",
                        color: "white",
                      }}
                    />
                  </div>**/}
                </div>

                <div class="colorcreatecard">
                  <div class="promotext">
                    <b>100 EOS</b> invested {periodbutton} ago, now{" "}
                    <b>
                      {historicalprices ? (
                        historicalprices[periodbutton]
                      ) : (
                          <CircularProgress
                            style={{ color: "#5A83F1" }}
                            size="14.4px"
                          />
                        )}{" "}
                      EOS
                    </b>
                  </div>
                  <div class="periodbuttons">
                    <div
                      class="periodbutton"
                      onClick={() => setPeriodbutton("a month")}
                      style={{
                        fontWeight: periodbutton == "a month" ? 600 : 400,
                      }}
                    >
                      1 Month
                    </div>
                    <div
                      class="periodbutton"
                      onClick={() => setPeriodbutton("six months")}
                      style={{
                        fontWeight: periodbutton == "six months" ? 600 : 400,
                      }}
                    >
                      6 Months
                    </div>
                    <div
                      class="periodbutton"
                      onClick={() => setPeriodbutton("a year")}
                      style={{
                        fontWeight: periodbutton == "a year" ? 600 : 400,
                      }}
                    >
                      Year
                    </div>
                  </div>
                </div>
                <div class="tabwrapper">
                  <div class="tabbuttons">
                    <Button
                      sx={{ borderRadius: "0" }}
                      style={{
                        color: "#534C80",
                        "border-bottom":
                          tabbutton == "invest"
                            ? "0.2rem solid #7FAAF5"
                            : "none",
                        lineHeight: "1.2rem",
                      }}
                      onClick={() => setTabbutton("invest")}
                    >
                      Invest
                    </Button>
                    <Button
                      sx={{ borderRadius: "0" }}
                      style={{
                        color: "#534C80",
                        "border-bottom":
                          tabbutton == "sell" ? "0.2rem solid #7FAAF5" : "none",
                        lineHeight: "1.2rem",
                      }}
                      onClick={() => setTabbutton("sell")}
                    >
                      Sell
                    </Button>
                  </div>
                  {tabbutton == "invest" ? (
                    <div class="invest">
                      <div
                        style={{
                          marginBottom: "4px",
                        }}
                        class="depositlabel"
                      >
                        Choose investment amount{" "}
                      </div>

                      <CssTextField
                        id="outlined"
                        value={tokens}
                        onChange={(e) => {
                          let input = e.target.value;
                          if (
                            !input ||
                            (input[input.length - 1].match("[0-9]") &&
                              input[0].match("[1-9]") &&
                              input.length < 6)
                          )
                            setTokens(input);
                        }}
                        sx={{
                          backgroundColor: "white",
                          opacity: 0.7,
                          borderRadius: "10px",
                          width: "100%",
                          input: { color: "#5A83F1", fontWeight: "600" },
                        }}
                        InputProps={{

                          endAdornment: (
                            <InputAdornment position="end">
                              {portfoliodata?.eosetfpriceineos ? (

                                "= " + parseFloat(
                                  tokens * portfoliodata?.eosetfpriceineos
                                )?.toFixed(2) +
                                " EOS"
                              ) : (
                                  <CircularProgress
                                    style={{ color: "#5A83F1" }}
                                    size="16px"
                                  />
                                )}
                            </InputAdornment>
                            /*
                           <InputAdornment position="end">
                                {portfoliodata?.eosetfpriceineos ? (
                                  parseFloat(
                                    tokens *
                                    portfoliodata?.eosetfpriceineos *
                                    portfoliodata?.eospriceinusd
                                  )?.toFixed(2) +
                                  " USD/" +
                                  parseFloat(
                                    tokens * portfoliodata?.eosetfpriceineos
                                  )?.toFixed(2) +
                                  " EOS"
                                ) : (
                                    <CircularProgress
                                      style={{ color: "#5A83F1" }}
                                      size="16px"
                                    />
                                  )}
                              </InputAdornment>
                              */
                          ),
                          startAdornment: (
                            <InputAdornment position="start">
                              EOSETF
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div
                        style={{
                          marginTop: "4px",
                        }}
                        class="depositlabel"
                      >
                        Balance:{" "}
                        <b>
                          {" "}
                          {portfoliodata?.eosbalance ? (
                            Number(
                              portfoliodata?.eosbalance?.balance.split(" ")[0]
                            ).toFixed(0) + " WAX"
                          ) : (
                              <CircularProgress
                                style={{ color: "#5A83F1" }}
                                size="13px"
                              />
                            )}
                        </b>
                      </div>
                      <button
                        onClick={() => dynamicsend(false)}
                        class="depositbutton"
                        style={{ marginTop: "20px" }}
                      >
                        Invest
                      </button>
                      <label style={{ fontSize: "13px" }}>Advanced</label>
                      <Switch
                        checked={checked1}
                        onChange={handleSwitchChange1}
                      />
                      {checked1 ? (
                        <>
                          <div style={{ fontSize: "13px" }}>
                            Uses your existing tokens to invest
                          </div>
                          <button
                            onClick={() => dynamicsend(true)}
                            class="depositbutton"
                          >
                            Buy missing and invest
                          </button>
                        </>
                      ) : (
                          <></>
                        )}
                    </div>
                  ) : (
                      <div class="invest">
                        <div
                          style={{
                            marginBottom: "4px",
                          }}
                          class="depositlabel"
                        >
                          Choose amount to sell
                      </div>
                        <CssTextField
                          id="outlined"
                          defaultValue="100"
                          onChange={(e) => {
                            let input = e.target.value;
                            if (
                              !input ||
                              (input[input.length - 1].match("[0-9]") &&
                                input[0].match("[1-9]") &&
                                input.length < 6)
                            )
                              setSelltokenamount(input);
                          }}
                          value={selltokenamount}
                          sx={{
                            backgroundColor: "white",
                            opacity: 0.7,
                            borderRadius: "10px",
                            width: "100%",
                            input: { color: "#5A83F1", fontWeight: "600" },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {"= "}{parseFloat(
                                  selltokenamount *
                                  portfoliodata?.eosetfpriceinusd
                                )?.toFixed(2)}
                                {" USD"}
                              </InputAdornment>
                            ),
                            startAdornment: (
                              <InputAdornment position="start">
                                EOSETF
                              </InputAdornment>
                            ),
                          }}
                        />
                        <div
                          style={{
                            marginTop: "4px",
                          }}
                          class="depositlabel"
                        >
                          Balance:{" "}
                          <b>
                            {" "}
                            {accountname
                              ? Number(
                                portfoliodata?.eosetfbalance?.balance?.split(
                                  " "
                                )[0]
                              ).toFixed(4) + " EOSETF"
                              : "0 EOSETF"}
                          </b>
                        </div>
                        <button
                          onClick={() => selltokens()}
                          class="depositbutton"
                          style={{ marginTop: "20px" }}
                        >
                          Sell
                      </button>
                        <label style={{ fontSize: "13px" }}>Advanced</label>
                        <Switch checked={checked} onChange={handleSwitchChange} />
                        {checked ? (
                          <>
                            <div style={{ fontSize: "13px" }}>
                              Redeem returns the underlying tokens.
                          </div>
                            <button
                              onClick={() => sendetf()}
                              class="depositbutton"
                            >
                              Redeem
                          </button>
                          </>
                        ) : (
                            <></>
                          )}
                      </div>
                    )}
                </div>
                {/**
              <Scrollbars class="mask" style={{ width: "100%", height: "90%" }} autoHide >
                <div class="rightbar">
                  {fulldata ? 
                  fulldata.map(row => {
                    if(Number(row.tokeninfund)!==0){
                    return(
                    <div class="smallcard" style={{ "border": (parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1) > getbalance(row) ? "solid 2px red" : "none" }}>
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src={row.image} />
                      </div>
                      <div class="smallcardtext">
                        <a>{(parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1)} {row.minamount.split(" ")[1]} tokens</a>
                      </div>
                      <div class="trxbutton">
                      {(parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1) < getbalance(row) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open(`https://defibox.io/pool-market-details/${row.pairid}`, "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                    </div>
                    )}
                  })
                  :
                  <></>
                  }
                  <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>
                </div>
              </Scrollbars>
              <div class="fade" />
              <div class="createbuttonwrapper">
                <button onClick={() => dynamicsend(true)} class="createbutton">Buy missing and Create</button>
                <button onClick={() => dynamicsend(false)} class="createbutton">Buy all and Create</button>
              </div>
              **/}
                <div style={{ display: "block", opacity: "0" }}>
                  .<br />.<br />.
                </div>
              </div>
            </Scrollbars>
          ) : view == "redeem" ? (
            <div class="rightbar">
              <div class="rightbartopbox">
                <div class="createetftitle">
                  <div>
                    <a>Redeem tokens</a>
                  </div>
                </div>
                <div className={classes.root}>
                  <Accordion className={classes.expansion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography className={classes.heading}>
                        Click here for more information
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansion2}>
                      <Typography
                        className={classes.heading}
                        style={{
                          "padding-right": "10px",
                          "padding-bottom": "46px",
                        }}
                      >
                        To redeem 13 tokens, EOSETF must be sent to fundfundfund
                        account. <br />
                        <br />
                        Sent EOSETF tokens get burned.
                        <br />
                        <br />
                        Redemption fee is set to 5%.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div class="slidertext">
                  <a>
                    You are redeeming{" "}
                    <input
                      class="tokeninput"
                      type="number"
                      value={redeemtokens}
                      onChange={(e) => setRedeemtokens(e.target.value)}
                    ></input>{" "}
                    EOSETF
                  </a>
                </div>
                <div class="slider">
                  <CustomSlider
                    defaultValue={0.0}
                    aria-label="custom thumb label"
                    step={1.0}
                    value={redeemtokens}
                    min={0}
                    max={200.0}
                    onChangeCommitted={(e, val) => setRedeemtokens(val)}
                    style={{
                      marginBottom: "10px",
                      "margin-top": "10px",
                      color: "white",
                    }}
                  />
                </div>
              </div>
              <Scrollbars
                class="mask"
                style={{ width: "100%", height: "90%" }}
                autoHide
              >
                <div class="rightbar">
                  {fulldata ? (
                    fulldata.map((row) => {
                      if (Number(row.tokeninfund) !== 0) {
                        return (
                          <div class="smallcard">
                            <div class="tokenlogo">
                              <img
                                class="tokenlogoimage"
                                height="100%"
                                src={row.image}
                              />
                            </div>
                            <div class="smallcardtext">
                              <a>
                                {(
                                  redeemtokens *
                                  row.minamount.split(" ")[0] *
                                  redemptionfee
                                ).toFixed(String(row.decimals).length - 1)}{" "}
                                {row.minamount.split(" ")[1]} tokens returned
                              </a>
                            </div>
                            <div class="trxbutton">
                              <img
                                class="trximage"
                                height="100%"
                                src="assets/tick.svg"
                              />
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                      <></>
                    )}

                  <div style={{ display: "block", opacity: "0" }}>
                    .<br />.<br />.
                  </div>
                </div>
              </Scrollbars>
              <div class="createbuttonwrapper">
                <button class="createbutton" onClick={() => sendetf()}>
                  Redeem tokens
                </button>
              </div>
            </div>
          ) : view == "stats" ? (
            <div class="rightbar">
              <div class="rightbartopbox">
                <div class="createetftitle">
                  <div>
                    <a>
                      Tokenomics
                      <CachedIcon
                        style={{
                          "margin-left": "5px",
                          width: "24px",
                          height: "auto",
                          "vertical-align": "middle",
                        }}
                        onClick={() => refresher()}
                      />
                    </a>
                  </div>
                </div>
                <div className={classes.root}>
                  <Accordion className={classes.expansion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography className={classes.heading}>
                        Click here for more information
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansion2}>
                      <Typography
                        className={classes.heading}
                        style={{
                          "padding-right": "10px",
                          "padding-bottom": "12px",
                        }}
                      >
                        CETF tokens will be distributed to EOSETF/EOS (Defibox)
                        liquidity providers and EOSETF fund managers for one
                        year.
                        <br />
                        <br /> Halving occurs once each month. Halving divides
                        the CETF rewards that liquidity providers receive by 2.{" "}
                        <br />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>

              <Scrollbars class="mask" style={{ width: "80%" }} autoHide>
                <div class="statcards">
                  <div class="statcard">
                    <a class="stat">
                      {gettokensupply(eosetfbalance).toLocaleString()} EOSETF
                    </a>
                    <a class="statexplainer">Circulating supply</a>
                  </div>

                  <div class="statcard">
                    <a class="stat">
                      {gettokensupply(etfbalance).toLocaleString()} CETF
                    </a>
                    <a class="statexplainer">Circulating supply (Max 80m)</a>
                  </div>

                  <div class="statcard">
                    <a class="stat">
                      {parseFloat(geteosetfprice().toFixed(2))} EOS
                    </a>
                    <a class="statexplainer">EOSETF price</a>
                  </div>
                  <div class="statcard">
                    <a class="stat">{etfprice.toFixed(2)} EOS </a>
                    <a class="statexplainer">
                      Price of tokens bought separately
                    </a>
                  </div>
                  <div class="statcard">
                    <a class="stat">{12}</a>
                    <a class="statexplainer">In total halvings</a>
                  </div>
                </div>
                <div style={{ display: "block", opacity: "0" }}>
                  .<br />.<br />.
                </div>
              </Scrollbars>
              <div class="fade" />
            </div>
          ) : view == "poll" ? (
            <Poll fulldata={fulldata} />
          ) : view == "about" ? (
            <div class="rightbar">
              <div class="rightbartopbox">
                <div class="createetftitle">EOSETF token allocation</div>
                <div class="slidertext">
                  <a>Chart shows % (in USD) of each token in the fund</a>
                </div>
              </div>
              <div class="chartwrapper">
                <Doughnut
                  options={{
                    maintainAspectRatio: false,
                    maxWidth: 300,
                    height: "auto",
                  }}
                  responsive="true"
                  data={data1}
                  legend={{
                    position: "bottom",
                    labels: {
                      filter: (legendItem, data) =>
                        data.datasets[0].data[legendItem.index] != 0,
                    },
                  }}
                />
              </div>
            </div>
          ) : view == "staking" ? (
            <Scrollbars
              class="mask"
              style={{ width: "100%", height: "100%", display: "flex" }}
              autoHide
            >
              <div class="rightbar">
                <div class="rightbartopbox">
                  <div class="createetftitle">Staking</div>
                  <div className={classes.root}>
                    <Accordion className={classes.expansion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.summary}
                      >
                        <Typography className={classes.heading}>
                          Click here for more information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.expansion2}>
                        <Typography
                          className={classes.heading}
                          style={{
                            "padding-right": "10px",
                            "padding-bottom": "1px",
                          }}
                        >
                          Staking CETF enables you to claim fees that the EOSETF
                          generates. <br />
                          <br />
                          Fees can be claimed once per week in My portfolio
                          view.
                          <br />
                          <br />
                          Amount of EOSETF you receive depends on the total amount of CETF staked.
                          <br />
                          <br />
                          Fees can be claimed week after staking CETF.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div class="staketopcardwrapper">
                    <div class="staketopcard">
                      <div class="stakestat">{Math.floor(stake) + " CETF"}</div>
                      <div class="stakedescriptor">You are staking</div>
                    </div>
                  </div>
                  <div class="slider">
                    <CustomSlider
                      defaultValue={Math.floor(stakemax)}
                      value={stake}
                      aria-label="custom thumb label"
                      step={1.0}
                      min={0}
                      max={Math.floor(stakemax)}
                      onChangeCommitted={(e, val) => setStake(val)}
                      style={{
                        marginBottom: "10px",
                        "margin-top": "10px",
                        color: "white",
                      }}
                    />
                  </div>{" "}
                  <div class="createbuttonwrapper" style={{ width: "100%" }}>
                    <button class="depositbutton" onClick={() => stakeetf()}>
                      Stake
                    </button>
                  </div>
                </div>

                {staketable?.rows.map((row, index) => {
                  return (
                    <div class="stakecard">
                      <div style={{ width: "60%", marginLeft: "10px" }}>
                        Staked: {row.staked}
                      </div>{" "}
                      <div
                        class="unstakebuttonwrapper"
                        style={{ width: "40%", marginRight: "10px" }}
                      >
                        <button
                          class="unstakebutton"
                          onClick={() => unstake(index)}
                        >
                          Unstake
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: "block", opacity: "0" }}>
                  .<br />.<br />.
                </div>
              </div>
            </Scrollbars>
          ) : view == "earn" ? (
            <Scrollbars
              class="mask2"
              style={{ width: "100%", height: "100%" }}
              autoHide
            >
              <div class="rightbar">
                <div class="rightbartopbox">
                  <div class="createetftitle">Earn CETF</div>
                  <div className={classes.root}>
                    <Accordion className={classes.expansion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.summary}
                      >
                        <Typography className={classes.heading}>
                          Click here for more information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.expansion2}>
                        <Typography
                          className={classes.heading}
                          style={{
                            "padding-right": "10px",
                            "padding-bottom": "1px",
                          }}
                        >
                          You can earn CETF tokens by depositing EOS and EOSETF
                          to Defibox.
                          <br />
                          <br />
                          EOSETF and EOS can be withdrawn from Defibox anytime.
                          <br />
                          <br />
                          We don't recommend depositing more than 50% of your
                          EOSETF and EOS holdings. You will always receive back
                          USD worth of tokens you deposited but you might lose
                          out on gains due to impermanent loss.
                          <br />
                          <br />
                          CETF tokens can be staked to earn fees that the EOSETF
                          generates.
                          <br />
                          <br />

                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div
                    style={{
                      marginBottom: "4px",
                    }}
                    class="depositlabel"
                  >
                    Choose amount to deposit
                  </div>
                  <CssTextField
                    id="outlined"
                    value={depositamounteosetf}
                    onChange={(e) => deposit(e.target.value, "EOSETF")}
                    sx={{
                      backgroundColor: "white",
                      opacity: 0.7,
                      borderRadius: "10px",
                      width: "100%",
                      input: { color: "#5A83F1", fontWeight: "600" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {"= "}{parseFloat(
                            depositamounteosetf *
                            portfoliodata?.eosetfpriceinusd
                          )?.toFixed(2)}{" "}
                          USD
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">EOSETF</InputAdornment>
                      ),
                    }}
                  />
                  <CssTextField
                    id="outlined"
                    value={depositamounteos}
                    onChange={(e) => deposit(e.target.value, "EOS")}
                    sx={{
                      backgroundColor: "white",
                      opacity: 0.7,
                      borderRadius: "10px",
                      width: "100%",
                      marginTop: "5px",
                      input: { color: "#5A83F1", fontWeight: "600" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {"= "}{parseFloat(
                            depositamounteos * portfoliodata?.eospriceinusd
                          )?.toFixed(2)}{" "}
                          USD
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">EOS</InputAdornment>
                      ),
                    }}
                  />
                  <button class="depositbutton">
                    Deposit
                  </button>

                  <div
                    style={{
                      marginBottom: "-12px",
                    }}
                    class="depositlabel"
                  >
                    Choose amount to withdraw
                  </div>
                  {portfoliodata?.alldeposits?.map((value, index) => {
                    return (
                      <div class="withdrawcard">
                        <div class="withdrawvalue">{value.staked}</div>
                        <br />
                        <div class="withdrawsecondrow">
                          <div class="withdrawsliderwrapper">
                            <Slider
                              defaultValue={25}
                              step={25}
                              onChangeCommitted={(e, val) =>
                                withdrawhandler(index, val)
                              }
                              valueLabelDisplay="auto"
                              marks
                              min={0}
                              max={100}
                              valueLabelFormat={(value) => <div>{value}%</div>}
                              className={classes.slider2}
                            />
                          </div>
                          <div class="withdrawbuttonwrapper">
                            <button
                              class="withdrawbutton"
                              onClick={() => withdraw(index)}
                            >
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{ display: "block", opacity: "0", marginTop: "50px" }}
                >
                  .<br />.<br />.
                </div>
              </div>
            </Scrollbars>
          ) : view == "portfolio" ? (
            <div class="rightbar">
              <div class="rightbartopbox">
                <div class="createetftitle">My portfolio</div>
                <div className={classes.root}>
                  <Accordion className={classes.expansion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography className={classes.heading}>
                        Click here for more information
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansion2}>
                      <Typography
                        className={classes.heading}
                        style={{
                          "padding-right": "10px",
                          "padding-bottom": "1px",
                        }}
                      >
                        EOS and EOSETF balance does not include tokens deposited
                        to Defibox.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div class="portfoliotopcardwrapper">
                  <div class="portfoliotopcard">
                    <div class="portfoliostat">
                      {accountname
                        ? Number(
                          portfoliodata?.eosetfbalance?.balance?.split(" ")[0]
                        ).toFixed(4) + " EOSETF"
                        : "0 EOSETF"}
                    </div>
                    <div class="portfoliodescriptor">
                      ~{portfoliodata?.eosetfinusd?.toFixed(0)} USD
                    </div>
                  </div>
                  <div class="portfoliotopcard">
                    <div class="portfoliostat">
                      {accountname
                        ? Number(
                          portfoliodata?.eosbalance?.balance.split(" ")[0]
                        ).toFixed(0) + " WAX"
                        : "0 WAX"}
                    </div>
                    <div class="portfoliodescriptor">
                      ~{portfoliodata?.eosinusd?.toFixed(0)} USD
                    </div>
                  </div>
                  <div class="portfoliotopcard">
                    <div class="portfoliostat">
                      {accountname
                        ? Number(
                          portfoliodata?.cetfbalance?.balance.split(" ")[0]
                        ).toFixed(0) + " CETF"
                        : "0 CETF"}
                    </div>
                    <div class="portfoliodescriptor">~{0} USD</div>
                  </div>
                </div>
                <div class="portfoliobottomwrapper">
                  <div style={{ width: "30%", height: "200px" }}>
                    <div class="claimcard">
                      <CircularProgressbar
                        value={timetilnext}
                        text={displaytime}
                        styles={buildStyles({
                          pathColor: `#7FAAF5`,
                          textColor: "#7FAAF5",
                          trailColor: "#DEE9FC",
                          backgroundColor: "#7FAAF5",
                        })}
                      />
                      <div style={{ marginTop: "10px" }}>
                        <div class="countercomment">
                          Until next claiming period
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="claimcard">
                    <>
                      <div class="claimtexts" style={{ fontWeight: "500" }}>
                        Available to claim
                      </div>
                      {dividendflag ? (
                        <div class="claimtexts">EOSETF claimed!</div>
                      ) : (
                          <div class="claimtexts">
                            {dividendclaim.toFixed(4)} EOSETF
                          </div>
                        )}
                      {dividendflagcetf ? (
                        <div class="claimtexts">CETF claimed!</div>
                      ) : (
                          <div class="claimtexts">{myshare.toFixed(4)} CETF</div>
                        )}
                      <button class="claimbutton" onClick={() => getdiv()}>
                        Claim
                      </button>
                    </>
                  </div>
                </div>
              </div>
            </div>
          ) : (
                            <a>Error</a>
                          )}
        </div>
        <div class="floating-menu">
          <div
            onClick={() => setView("create")}
            style={{ fontWeight: view == "create" ? 600 : 400 }}
          >
            Invest
          </div>
          <div
            onClick={() => setView("staking")}
            style={{ fontWeight: view == "staking" ? 600 : 400 }}
          >
            Stake
          </div>
          <div
            onClick={() => setView("portfolio")}
            style={{ fontWeight: view == "portfolio" ? 600 : 400 }}
          >
            My Portfolio
          </div>
          <div
            onClick={() => handleShow22()}
            style={{ fontWeight: 400 }}
          >
            Endpoint
          </div>
          <img
            src="assets/burger.svg"
            class="menubutton"
            onClick={toggleDrawer(true)}
          />
        </div>
      </header>
    </div>
  );
}

export default withUAL(App);