const dashboard = async (req, res) => {
    res.render("app/dashboard", {
        title: "Dashboard",
        csrfToken: req.csrfToken(),
    });
};

export { dashboard };
