package group1.toa.repository;

import group1.toa.domain.Toilet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ToaRepository {

    @Autowired
    private DataSource dataSource;

    public List<Toilet> getToilets(String SQL) {

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(SQL)) {
            List<Toilet> allToilets = new ArrayList<>();

            while (rs.next()) {
                allToilets.add(rsToilet(rs));
            }
            return allToilets;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Toilet rsToilet(ResultSet rs) throws SQLException {

        return new Toilet(rs.getString("Index"),
                rs.getString("Address"),
                rs.getFloat("Latitude"),
                rs.getFloat("Longitude"),
                rs.getInt("IsHandicap"),
                rs.getInt("HasChangingTable"),
                rs.getInt("MustPay"),
                rs.getString("Hours"));
    }

    public List<Toilet> getAllToilets() {
        return getToilets("SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets]");
    }

    public List<Toilet> getHandicapToilets() {
        return getToilets("SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets] WHERE IsHandicap = 1");
    }

    public List<Toilet> getChangingTables() {
        return getToilets("SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets] WHERE HasChangingTable > 0");
    }

    public List<Toilet> getFreeToilets() {
        return getToilets("SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets] WHERE MustPay = 0");
    }

    public List<Toilet> getFiveClosestToilets(double userLat, double userLng, boolean hasChangingTable,
                                              boolean isHandicap, boolean isFree, boolean isOpen) {
        String sqlQueryString = "SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets]";
        if (hasChangingTable) {
            sqlQueryString += " WHERE HasChangingTable > 0";
            if (isHandicap) {
                sqlQueryString += " AND IsHandicap > 0";
            }
            if (isFree) {
                sqlQueryString += " AND MustPay = 0";
            }
        } else if (isHandicap) {
            sqlQueryString += " WHERE IsHandicap > 0";
            if (isFree) {
                sqlQueryString += " AND MustPay = 0";
            }
        } else if (isFree) {
            sqlQueryString += " WHERE MustPay = 0";
        }

        List<Toilet> toilets = getToilets(sqlQueryString);
        HashMap<String, Double> distMap = new HashMap<String, Double>();
        for (Toilet toa : toilets) {
            double toaLat = toa.getLatitude();
            double toaLng = toa.getLongitude();
            double distance = Math.sqrt(Math.pow(toaLat - userLat, 2) + Math.pow(toaLng - userLng, 2));
            distMap.put(toa.getIndex(), distance);
        }
        HashMap<String, Double> sortedDistMap = distMap.entrySet().stream().sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        int i = 0;
        HashMap<String, Double> topFive = new HashMap<>();
        for (Map.Entry<String, Double> entry : sortedDistMap.entrySet()) {
            topFive.put(entry.getKey(), entry.getValue());
            if (++i > 5) {
                break;
            }
        }

        List<Toilet> fiveClosest = new ArrayList<>();
        for (Toilet toa : toilets) {
            if (topFive.containsKey(toa.getIndex())) {
                fiveClosest.add(toa);
            }
            if (fiveClosest.size()==5) break;
        }
        return fiveClosest;
    }
}
